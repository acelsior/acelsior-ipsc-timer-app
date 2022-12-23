<script lang="ts">
	import TimerTime from "./Timer.time.svelte";
	import TimerDetails from "./Timer.Details.svelte";
	import TimerButtonGroup from "./Timer.buttonGroup.svelte";
	import TimerHistory from "./Timer.history.svelte";
	import Setting from "./setting/Timer.setting.svelte";
	import { IPSCBluetooth } from "./StopPlateBluethoothClass";
	import { navigate } from "svelte-native";
	import { TimerSetting } from "./setting/TimerSettingClass";

	import * as fs from "@nativescript/core/file-system";
	import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";

	interface record {
		//data for display
		shot: number;
		time: number;
		timestamp: Date;
		splitTime: number;
	}

	let displayTime = 0; //display time , in normally this equals to record.time , when timer start it will be count down
	let currentShot: number = 0; //in program order
	let totalShot: number = 0; //in program order
	let records: record[] = [
		{
			shot: 0,
			time: 0,
			timestamp: new Date(),
			splitTime: 0,
		},
	];
	let menuButtonEnabled: boolean = true;
	let startButtonEnabled: boolean = true;
	let clearButtonEnabled: boolean = true;
	let reviewButtonEnabled: boolean = true;
	let stopButtonEnabled: boolean = false;
	let isTimerStarted: boolean = false;
	let countDownInterval: NodeJS.Timer;
	let rerenderValue = true;

	//#region get buzzer ready
	const pathToBeep = fs.path.join(
		fs.knownFolders.currentApp().path,
		"/audio/beep.mp3"
	);
	//#endregion
	var mediaPlayer = new android.media.MediaPlayer();
	mediaPlayer.setDataSource(pathToBeep);

	function getRandomNumberInRange(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.random() * (max - min) + min; // The maximum is exclusive and the minimum is inclusive
	}

	async function beep(duration: number) {
		return new Promise((resolve) => {
			mediaPlayer.setAudioStreamType(
				android.media.AudioManager.STREAM_MUSIC
			);
			mediaPlayer.prepare();
			mediaPlayer.start();
			setTimeout(() => {
				mediaPlayer.stop();
				resolve(null);
			}, duration);
		});
	}

	async function onTimerStart() {
		new Promise(async (resolve) => {
			stopButtonEnabled = true;
			reviewButtonEnabled = true;
			menuButtonEnabled = false;
			startButtonEnabled = false;
			clearButtonEnabled = false;
			isTimerStarted = true;
			//#region count down
			const startCountDownTime = new Date().getTime();
			const countDownDelay = getRandomNumberInRange(
				TimerSetting.DelayMin,
				TimerSetting.DelayMax
			);
			IPSCBluetooth.registerHitEvent(() => {
				onTimerStop();
			});
			await new Promise((resolve, reject) => {
				countDownInterval = setInterval(() => {
					displayTime =
						countDownDelay -
						(new Date().getTime() - startCountDownTime) / 1000;
					if (
						(new Date().getTime() - startCountDownTime) / 1000 >
						countDownDelay
					) {
						resolve(null);
					}
				}, 1);
			});
			//#endregion
			clearInterval(countDownInterval);
			onTimerClear();
			beep(TimerSetting.BeepDuration * 1000);
			resolve(null);
		});
	}

	function onTimerClear() {
		records = [
			{
				shot: 0,
				time: 0,
				timestamp: new Date(),
				splitTime: 0,
			},
		];
		currentShot = 0;
		displayTime = 0;
		totalShot = 0;
	}
	function onTimerReview() {
		menuButtonEnabled = true;
		startButtonEnabled = true;
		clearButtonEnabled = true;
		reviewButtonEnabled = true;
		stopButtonEnabled = false;
		isTimerStarted = false;
		clearInterval(countDownInterval);
		IPSCBluetooth.unregisterHitEvent();
	}
	function onTimerStop() {
		if (!isTimerStarted) return;
		var nowTime = new Date().getTime();
		records.push({
			shot: currentShot + 1,
			time: (nowTime - records[0].timestamp.getTime()) / 1000,
			timestamp: new Date(),
			splitTime:
				(nowTime - records[currentShot].timestamp.getTime()) / 1000,
		});
		records = records;
		currentShot += 1;
		totalShot += 1;
		displayTime = (nowTime - records[0].timestamp.getTime()) / 1000;
	}

	function onMenu() {
		navigate({
			page: Setting,
			animated: true,
			transition: {
				name: "slideRight",
				curve: new CubicBezierAnimationCurve(0.85, -0.01, 0.1, 1.02),
				duration: 300,
			},
			backstackVisible: true,
		});
	}

	function onSelectHistory(e: CustomEvent<{ item: record }>) {
		currentShot = records.indexOf(e.detail.item);
		records = [...records]; //force svelte re-render
		displayTime = e.detail.item.time;
	}
</script>

<frame>
	<page>
		<actionBar title="IPSC Timer" />
		<dockLayout stretchLastChild="false">
			{#if rerenderValue}
				<flexboxLayout dock="top">
					<TimerTime time={displayTime} />
					<TimerDetails
						currentShot={records[currentShot].shot}
						totalShot={records.length - 1}
						splitTime={records[currentShot].splitTime}
					/>
					<TimerButtonGroup
						on:start={onTimerStart}
						on:clear={onTimerClear}
						on:review={onTimerReview}
						on:stop={onTimerStop}
						on:menu={onMenu}
						{menuButtonEnabled}
						{startButtonEnabled}
						{clearButtonEnabled}
						{reviewButtonEnabled}
						{stopButtonEnabled}
					/>
				</flexboxLayout>
				<flexboxLayout dock="top" style="height: 100%;">
					<TimerHistory
						on:selectHistory={onSelectHistory}
						{records}
					/>
				</flexboxLayout>
				<label>{rerenderValue}</label>
			{/if}
		</dockLayout>
	</page>
</frame>

<style scoped lang="scss">
	@import "../../color.scss";

	actionBar {
		background-color: $majorBackgroundColor;
		color: $majorColor
	}

	flexboxLayout {
		flex-direction: column;
		background-color: $majorBackgroundColor !important;
	}
</style>

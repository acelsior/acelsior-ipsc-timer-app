<script lang="ts">
	import TimerTime from "./Timer.Time.svelte";
	import TimerDetails from "./Timer.Details.svelte";
	import TimerButtonGroup from "./Timer.buttonGroup.svelte";
	import TimerHistory from "./Timer.history.svelte";
	import Setting from "./setting/Timer.setting.svelte";
	import { IPSCBluetooth } from "./StopPlateBluethoothClass";
	import { showModal } from "svelte-native";
	import { TimerSetting } from "./setting/TimerSettingClass";

	import * as fs from "@nativescript/core/file-system";

	interface record {
		//data for display
		shot: number;
		time: number;
		timestamp: Date;
		splitTime: number;
	}

	export let displayTime = 0; //display time , in normally this equals to record.time , when timer start it will be count down
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

	function beep(duration: number) {
		mediaPlayer.setAudioStreamType(android.media.AudioManager.STREAM_MUSIC);
		mediaPlayer.prepare();
		mediaPlayer.setVolume(100, 100);
		mediaPlayer.start();
		setTimeout(() => {
			mediaPlayer.stop();
		}, duration);
	}

	async function onTimerStart() {
		stopButtonEnabled = true;
		reviewButtonEnabled = true;
		menuButtonEnabled = false;
		startButtonEnabled = false;
		clearButtonEnabled = false;
		isTimerStarted = true;
		//#region count down
		let startCountDownTime = new Date().getTime();
		let countDownDelay = getRandomNumberInRange(
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
		onTimerClear();
		clearInterval(countDownInterval);
		beep(TimerSetting.BeepDuration * 1000);
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
		showModal({ page: Setting, fullscreen: true, animated: true });
	}

	function onSelectHistory(e: CustomEvent<{ item: record }>) {
		currentShot = records.indexOf(e.detail.item);
		records = [...records]; //force svelte re-render
		displayTime = e.detail.item.time;
	}
</script>

<dockLayout stretchLastChild="false">
	<flexboxLayout dock="top">
		<TimerTime bind:time={displayTime} />
		<TimerDetails
			bind:currentShot={records[currentShot].shot}
			bind:totalShot
			bind:splitTime={records[currentShot].splitTime}
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
		<TimerHistory on:selectHistory={onSelectHistory} {records} />
	</flexboxLayout>
</dockLayout>

<style scoped lang="scss">
	@import "../../color.scss";

	flexboxLayout {
		flex-direction: column;
		background-color: $majorBackgroundColor !important;
	}
</style>

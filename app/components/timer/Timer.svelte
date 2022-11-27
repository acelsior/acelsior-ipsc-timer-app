<script lang="ts">
	import TimerTime from "./Timer.Time.svelte";
	import TimerDetails from "./Timer.Details.svelte";
	import TimerButtonGroup from "./Timer.buttonGroup.svelte";
	import TimerHistory from "./Timer.history.svelte";
	import Setting from "./setting/Timer.setting.svelte";
	import { IPSCBluetooth } from "./StopPlateBluethoothClass";
	import { showModal } from "svelte-native";
	import { TimerSetting } from "./setting/TimerSettingClass";

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

	function beep(duration: number, frequency: number, volume: number) {
		const myAudioContext = new AudioContext();
		return new Promise((resolve, reject) => {
			// Set default duration if not provided
			duration = duration || 200;
			frequency = frequency || 440;
			volume = volume || 100;

			try {
				let oscillatorNode = myAudioContext.createOscillator();
				let gainNode = myAudioContext.createGain();
				oscillatorNode.connect(gainNode);

				// Set the oscillator frequency in hertz
				oscillatorNode.frequency.value = frequency;

				// Set the type of oscillator
				oscillatorNode.type = "square";
				gainNode.connect(myAudioContext.destination);

				// Set the gain to the volume
				gainNode.gain.value = volume * 0.01;

				// Start audio with the desired duration
				oscillatorNode.start(myAudioContext.currentTime);
				oscillatorNode.stop(
					myAudioContext.currentTime + duration * 0.001
				);

				// Resolve the promise when the sound is finished
				oscillatorNode.onended = () => {
					resolve(null);
				};
			} catch (error) {
				reject(error);
			}
		});
	}

	function getRandomNumberInRange(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.random() * (max - min) + min; // The maximum is exclusive and the minimum is inclusive
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
					clearInterval(countDownInterval);
					resolve(null);
				}
			}, 1);
		});
		//#endregion
		onTimerClear();

		beep(
			// Set the duration to 0.2 second (200 milliseconds)
			1000,
			// Set the frequency of the note to A4 (440 Hz)
			1024,
			// Set the volume of the beep to 100%
			100
		);
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
		<TimerHistory {records} />
	</flexboxLayout>
</dockLayout>

<style scoped lang="scss">
	@import "../../color.scss";

	flexboxLayout {
		flex-direction: column;
		background-color: $majorBackgroundColor !important;
	}
</style>

<script lang="ts">
	import TimerTime from "./Timer.Time.svelte";
	import TimerDetails from "./Timer.Details.svelte";
	import TimerButtonGroup from "./Timer.buttonGroup.svelte";
	import TimerHistory from "./Timer.history.svelte";
	import { timer } from "@nativescript/core/profiling";

	interface ITimer {
		displayTime: number;
		startTime: Date;
		timeRecords: number[];
		currentShot: number;
		totalShots: number;
	}

	let Timer: ITimer = {
		displayTime: 0,
		startTime: new Date(),
		timeRecords: [],
		currentShot: 0,
		totalShots: 0,
	}

	function onStart() {
		onClear()
    };
    function onClear() {
		Timer.displayTime = 0;
		Timer.startTime = new Date();
		Timer.timeRecords = [];
		Timer.currentShot = 0;
		Timer.totalShots = 0;
    }
    function onReview() {
    }
    function onManualStop() {
		const nowTime = (new Date().getTime() - Timer.startTime.getTime()) / 1000;
		Timer.displayTime = nowTime;
		Timer.timeRecords.push(nowTime);
		Timer.totalShots = Timer.timeRecords.length;
		Timer.currentShot = Timer.totalShots;
    }
</script>

<dockLayout stretchLastChild="false">
	<flexboxLayout dock="top">
		<TimerTime time={Timer.displayTime}/>
		<TimerDetails currentShot={Timer.currentShot} totalShots={Timer.totalShots} splitTime={1}/>
		<TimerButtonGroup onStart={onStart} onClear={onClear} onReview={onReview} onManualStop={onManualStop} />
	</flexboxLayout>
	<flexboxLayout dock="top" style="height: 100%;">
		<TimerHistory timerHistory={Timer.timeRecords}/>
	</flexboxLayout>
</dockLayout>

<style lang="scss">
	@import "../../color.scss";

	flexboxLayout {
		flex-direction: column;
		background-color: $majorBackgroundColor !important;
	}
</style>

<script lang="ts">
	import TimerTime from "./Timer.Time.svelte";
	import TimerDetails from "./Timer.Details.svelte";
	import TimerButtonGroup from "./Timer.buttonGroup.svelte";
	import TimerHistory from "./Timer.history.svelte";

	interface record { //data for display
		shot: number;
		time: number;
		timestamp: Date;
		splitTime: number;
	}

	let displayTime = 0; //display time , in normally this equals to record.time , when timer start it will be count down
	let currentShot: number = 1 //in program order
	let records : record[] = [
		{
			shot: 0,
			time: 0,
			timestamp: new Date(),
			splitTime: 0,
		},
		{
			shot: 1,
			time: 1.88,
			timestamp: new Date(),
			splitTime: 1.88,
		}
	];




</script>

<dockLayout stretchLastChild="false">
	<flexboxLayout dock="top">
		<TimerTime bind:time={displayTime}/>
		<TimerDetails bind:currentShot={records[currentShot].shot} bind:totalShot={records.length} bind:splitTime={records[currentShot].splitTime}/>
		<TimerButtonGroup />
	</flexboxLayout>
	<flexboxLayout dock="top" style="height: 100%;">
		<TimerHistory records={records} />
	</flexboxLayout>
</dockLayout>

<style lang="scss">
	@import "../../color.scss";

	flexboxLayout {
		flex-direction: column;
		background-color: $majorBackgroundColor !important;
	}
</style>

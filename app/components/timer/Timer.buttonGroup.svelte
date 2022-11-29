<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { TimerSetting } from "./setting/TimerSettingClass";
	const dispatch = createEventDispatcher();
	export let menuButtonEnabled: boolean = true;
	export let startButtonEnabled: boolean = true;
	export let clearButtonEnabled: boolean = true;
	export let reviewButtonEnabled: boolean = true;
	export let stopButtonEnabled: boolean = true;


	TimerSetting.onSettingsChanged(() => {
		TimerSetting.isManualStopEnable = TimerSetting.isManualStopEnable; //force re-render
	});
</script>

<flexboxLayout>
	<button isEnabled={menuButtonEnabled} on:tap={() => dispatch("menu")}
		>MENU</button
	>
	<button isEnabled={startButtonEnabled} on:tap={() => dispatch("start")}
		>START</button
	>
	<button isEnabled={clearButtonEnabled} on:tap={() => dispatch("clear")}
		>CLEAR</button
	>
	<button isEnabled={reviewButtonEnabled} on:tap={() => dispatch("review")}
		>REVIEW</button
	>
	{#if TimerSetting.isManualStopEnable}
		<button
			isEnabled={stopButtonEnabled}
			class="bigButton"
			on:tap={() => dispatch("stop")}>MANUAL STOP</button
		>
	{/if}
</flexboxLayout>

<style scoped lang="scss">
	@import "../../color.scss";

	flexboxLayout {
		align-self: center;
		flex-wrap: wrap;
		width: 75%;
	}

	button {
		width: 50%;
		font-size: 25px;
		background-color: $secondaryBackgroundColor;
	}

	.bigButton {
		width: 100%;
	}
</style>

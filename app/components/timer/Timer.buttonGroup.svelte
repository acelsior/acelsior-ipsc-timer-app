<script lang="ts">
	export let onStart = () => {}
	export let onClear = () => {}
	export let onReview = () => {}
	export let onManualStop = () => {}
</script>

<flexboxLayout>
    <button on:tap={onStart}>MENU</button>
    <button on:tap={onStart}>START</button>
    <button on:tap={onClear}>CLEAR</button>
    <button on:tap={onReview}>REVIEW</button>
    <button class="bigButton" on:tap={onManualStop}>MANUAL STOP</button>
</flexboxLayout>

<style lang="scss">
	@import "../../color.scss";

	flexboxLayout {
		align-self: center;
		flex-wrap: wrap;
		width:75%;
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

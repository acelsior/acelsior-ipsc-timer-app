<script lang="ts">
	export let currentShot: number
	export let totalShots: number
	export let splitTime: number
</script>

<flexboxLayout>
    <label >Shot {currentShot} / {totalShots}</label>
    <label >Split {splitTime}</label>
</flexboxLayout>

<style lang="scss">
	@import "../../color.scss";

	label {
		color: $majorColor;
		width: 50%;
        text-align: center;
        margin: 5px;
	}
</style>

<script lang="ts">
	export let time: number


</script>

<label>{(time).toFixed(2)}</label>

<style lang="scss">
	@import "../../color.scss";

	label {
		text-align: center;
		font-size: 102;
		color: $majorColor;
	}
</style>

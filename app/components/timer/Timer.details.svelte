<script lang="ts">

	export let currentShot: number;
	export let totalShot: number;
	export let splitTime: number;

</script>

<flexboxLayout>
    <label >Shot {currentShot} / {totalShot}</label>
    <label >Split {(splitTime).toFixed(2)}</label>
</flexboxLayout>

<style scoped  lang="scss">
	@import "../../color.scss";

	label {
		color: $majorColor;
		width: 50%;
        text-align: center;
        margin: 5px;
	}
</style>

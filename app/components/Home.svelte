<script lang="ts">
	import Timer from "./timer/Timer.svelte";
</script>

<frame>
	<page>
		<actionBar title="IPSC Timer" />
		<gridLayout>
			<Timer />
		</gridLayout>
	</page>
</frame>

<style lang="scss">
	@import "../color.scss";

	actionBar {
		background-color: $majorBackgroundColor;
		color: $majorColor
	}
</style>

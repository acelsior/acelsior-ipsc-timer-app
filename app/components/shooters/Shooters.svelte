<script lang="ts">
	import ShootersList from "./Shooters.list.svelte"
</script>

<frame>
	<page>
		<actionBar title="Shooters" />
		<stackLayout>
			<ShootersList />
		</stackLayout>
	</page>
</frame>

<style lang="scss">
	@import "../../color.scss";

	actionBar {
		background-color: $majorBackgroundColor;
		color: $majorColor;
	}

	page {
		background-color: $majorBackgroundColor;
	}
</style>

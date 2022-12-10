<script lang="ts">
	import { Shooter } from "../classes/Shooters.type";
	export let shooter: Shooter;
</script>

<stackLayout>
	<label text={shooter.name} />
	<button horizontalAlignment="left" width="auto">Details</button>
	<button horizontalAlignment="left" width="auto">Edit</button>
</stackLayout>

<style lang="scss">
	@import "../../../color.scss";

	stackLayout {
		margin: 10px;
		border-radius: 10px;
		orientation: horizontal;
		background-color: $cautionBackgroundColor;
	}

	stackLayout > label {
		padding-left: 20px;
		text-align: left;
		vertical-align: middle;
		color: $majorColor;
		font-size: 25;
		width: 50%;
	}
</style>

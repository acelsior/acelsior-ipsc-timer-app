<script lang="ts">
	import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";
	import { navigate } from "svelte-native";
	import { Shooter } from "../classes/Shooters.type";
	import ShooterConfig from "../Shooter.config.svelte"
	export let shooter: Shooter;

	function onDetails() {
	}

	function onEdit() {
		navigate({
			page: ShooterConfig,
			props: {
				isNewShooter: false,
				shooterId: shooter.shooter_id,
				shooterName: shooter.name,
				shooterDivision: shooter.division,
			},
			animated: true,
			transition: {
				name: "slide",
				curve: new CubicBezierAnimationCurve(0.85, -0.01, 0.1, 1.02),
				duration: 300,
			},
			backstackVisible: true,
		});
	}
</script>

<stackLayout>
	<label text={shooter.name} />
	<button horizontalAlignment="left" width="auto" on:tap={onDetails}>Details</button>
	<button horizontalAlignment="left" width="auto" on:tap={onEdit}>Edit</button>
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

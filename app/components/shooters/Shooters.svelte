<script lang="ts">
	import ShootersList from "./shooter.list/Shooters.list.svelte";
	import { navigate } from "svelte-native";
	import ShooterConfig from "./Shooter.config.svelte";
	import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";
	import { Shooter } from "./classes/Shooters.type";

	function onAddShooter() {
		navigate({
			page: ShooterConfig,
			props: {
				isNewShooter: true
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

<frame>
	<page>
		<actionBar title="Shooters" />
		<dockLayout>
			<flexboxLayout dock="top">
				<ShootersList />
			</flexboxLayout>
			<flexboxLayout id="bottom_button_dock" dock="bottom">
				<button on:tap={onAddShooter}>Add shooter >> </button>
			</flexboxLayout>
		</dockLayout>
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


	#bottom_button_dock {
		justify-content: center;
		width: 100%;
		height: 50;
		margin-bottom: 20;
	}
	#bottom_button_dock > button {
		width: 90%;
		height: 100%;
	}
</style>

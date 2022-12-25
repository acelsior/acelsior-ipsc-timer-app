<script lang="ts">
    import Timer from './components/timer/Timer.svelte'
    import Shooters from './components/shooters/Shooters.svelte'
	import { navigate, showModal } from 'svelte-native'
	import { CubicBezierAnimationCurve } from '@nativescript/core/ui/animation';

	function navigateToPage(page: any) {
		showModal({
			page: page,
			fullscreen: true,
			animated: true,
		})
	}
</script>

<page>
	<stackLayout>
		<button on:tap={() => navigateToPage(Shooters)} >Shooters</button>
		<button on:tap={() => navigateToPage(Timer)} >Timer</button>
	</stackLayout>
</page>

<style scoped lang="scss">
	@import "color.scss";

	button {
		width: 100%;
		font-size: 20px;
		background-color: $secondaryBackgroundColor;
	}

	page {
		background-color: $majorBackgroundColor !important;
	}

	stackLayout {
		height: 100%;
		vertical-align: center;
	}
</style>

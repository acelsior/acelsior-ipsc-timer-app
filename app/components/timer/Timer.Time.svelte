<script lang="ts">
	export let time: number
	import { TimerSetting } from "./setting/TimerSettingClass";
</script>

<label>{(time).toFixed(2)}</label>

<style scoped lang="scss">
	@import "../../color.scss";

	label {
		text-align: center;
		font-size: 102;
		color: $majorColor;
	}
</style>

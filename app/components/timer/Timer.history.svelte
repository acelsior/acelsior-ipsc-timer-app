<script lang="ts">
	interface record {
		//data for display
		shot: number;
		time: number;
		timestamp: Date;
		splitTime: number;
	}

	import { afterUpdate } from "svelte";
	export let records: record[];
	let reversedHistory = new Array<record>();

	afterUpdate(() => {
		//reverse history list with deep copy
		reversedHistory = [...records];
		reversedHistory.reverse();
	});
</script>

<stackLayout>
	<label>Hit History</label>
	<scrollView>
		<stackLayout>
			{#each reversedHistory as item}
				<button>
					🔘 {item.shot}: {item.time.toFixed(2)} - {item.splitTime.toFixed(
						2
					)}
				</button>
			{/each}
		</stackLayout>
	</scrollView>
</stackLayout>

<style scoped lang="scss">
	@import "../../color.scss";

	stackLayout {
		width: 100%;
	}

	label {
		font-size: 20px;
		color: $majorColor;
		padding: 10px;
	}

	button {
		color: $majorColor;
		font-size: 30px;
		background-color: $cautionBackgroundColor;
		padding: 40px;
		padding-left: 50px;
		text-align: left;
	}

	scrollView {
		width: 90%;
		height: 1000%;
	}
</style>

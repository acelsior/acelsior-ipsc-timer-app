<script lang="ts">
	interface record { //data for display
		shot: number;
		time: number;
		timestamp: Date;
		splitTime: number;
	}

	export let records: record[] = []

	let reversedRecords: record[] = []
	import { beforeUpdate, tick } from 'svelte';

	beforeUpdate(async () => {
		reversedRecords = records.reverse();
		await tick();
	});


</script>

<stackLayout>
    <label>Hit History</label>
    <scrollView>
        <stackLayout>
			{#each reversedRecords as item}
				<button>
                   	🔘 {item.shot}: {item.time.toFixed(2)} - {item.splitTime.toFixed(2)}
                </button>
			{/each}
        </stackLayout>
    </scrollView>
</stackLayout>

<style lang="scss">
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
        text-align: left;
	}

	scrollView {
		width: 90%;
		height: 1000%;
	}
</style>

<script lang="ts">
	import { afterUpdate } from 'svelte';
	export let timerHistory :number[]
	let reversedHistory = new Array<number>();

	afterUpdate(() => { //reverse history list with deep copy
		reversedHistory = [...timerHistory];
		reversedHistory.reverse();
	})

</script>

<stackLayout>
    <label>Hit History</label>
    <scrollView>
        <stackLayout>
			{#each reversedHistory as item}
				<button>
                    {item.toFixed(2)}
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
        padding: 40px;
		padding-left: 50px;
        text-align: left;
	}

	scrollView {
		width: 90%;
		height: 1000%;
	}
</style>

<script lang="ts">
	import { ShooterStore } from "../classes/Shooters.store";
	import { Shooter } from "../classes/Shooters.type";
	import ShootersListItem from "./Shooters.list.item.svelte";

	let shooters: Shooter[];

	shooters = ShooterStore.GetAllShooter()
	ShooterStore.onSettingsChanged(() => {
		shooters = ShooterStore.GetAllShooter()
	})
</script>

<scrollView height="90%">
	<stackLayout>
		{#each shooters as shooter}
			<ShootersListItem shooter={shooter} />
		{/each}
	</stackLayout>
</scrollView>

<style lang="scss">
</style>

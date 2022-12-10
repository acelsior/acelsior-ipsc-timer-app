<script lang="ts">
	import { PropertyChangeData } from "@nativescript/core";
	import { Division, Shooter } from "./classes/Shooters.type";
	export let isNewShooter = false; //if false it will change the shooter profile, if true it will create a new shooter

	const divisions = Object.values(Division);

	export let shooterName = "";
	export let shooterDivision: Division = "Open";

	function onDivisionChanged(event: PropertyChangeData) {
		shooterDivision = divisions[event.value] as Division;
	}

	function createShooter() {
		console.log("createShooter", shooterName, shooterDivision);
		Shooter.CreateShooter({
			division: shooterDivision,
			name: shooterName,
		})
	}
</script>

<page>
	<actionBar title="Shooters configuration" />
	<dockLayout stretchLastChild="false">
		<stackLayout dock="top">
			<textField bind:text={shooterName} hint="Shooter Name" />
			<label>Division: {shooterDivision}</label>
			<listPicker
				items={divisions}
				selectedIndex="0"
				on:selectedIndexChange={onDivisionChanged}
			/>
		</stackLayout>
		<gridLayout id="bottom_button_dock" dock="bottom">
			{#if isNewShooter}
				<button on:tap={createShooter}> {"<<"} Add shooter</button>
			{:else}
				<button>Apply</button>
			{/if}
		</gridLayout>
	</dockLayout>
</page>

<style lang="scss">
	@import "../../color.scss";

	actionBar {
		background-color: $majorBackgroundColor;
		color: $majorColor;
	}

	page {
		background-color: $majorBackgroundColor;
	}

	textField {
		color: $majorColor;
		background-color: $cautionBackgroundColor;
		margin: 10;
		border-radius: 10px;
		placeholder-color: $secondaryColor;
	}

	listPicker {
		background-color: $cautionBackgroundColor;
		margin: 10;
		color: $majorColor;
		border-radius: 10;
	}

	label {
		color: $majorColor;
		font-size: 20;
		text-align: center;
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

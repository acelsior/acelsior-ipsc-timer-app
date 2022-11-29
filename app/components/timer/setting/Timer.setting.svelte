<script lang="ts">
	import { PropertyChangeData } from "@nativescript/core";
	import { TimerSetting } from "./TimerSettingClass";
	import { IPSCBluetooth } from "../StopPlateBluethoothClass";

	//#region bluetooth
	async function onScanStopPlate() {
		const scanResualt = await IPSCBluetooth.scanStopPlate();
		stopplateList = [];
		scanResualt.forEach((bluetooth) => {
			let itemToPush = {
				UUID: bluetooth.UUID,
				localName: bluetooth.localName ?? "none",
			};
			stopplateList.push(itemToPush);
			console.log(stopplateList.length, itemToPush);
			if (
				itemToPush.UUID != stopplateList[stopplateList.length].UUID ||
				stopplateList.length === 0
			) {
			}
		});
	}
	function onDisconnectStopPlate() {
		IPSCBluetooth.disconnect();
	}
	function onFlashStopPlate() {
		IPSCBluetooth.flash();
	}
	async function connectToStopPlate(uuid: string) {
		await IPSCBluetooth.connect(uuid);
		IPSCBluetooth.setIndicatorDuration(
			TimerSetting.StopPlateIndicatorDuration
		);
	}
	//set indicator time
	IPSCBluetooth.setIndicatorDuration(TimerSetting.StopPlateIndicatorDuration);
	//#endregion

	let StopPlateIndicatorDuration = TimerSetting.StopPlateIndicatorDuration;
	let beepDuration = TimerSetting.BeepDuration;
	let display_DelayFrom = TimerSetting.DelayMin.toString(); //DelayFrom.toString -> display_DelayFrom
	let display_DelayTo = TimerSetting.DelayMax.toString(); // DelayTo.toString -> display_DelayTo
	let stopplateList: { UUID: string; localName: string }[] = [];

	function onStopPlateIndicatorDurationChange(data: PropertyChangeData) {
		StopPlateIndicatorDuration = data.value;
		TimerSetting.StopPlateIndicatorDuration = parseFloat(data.value);
		IPSCBluetooth.setIndicatorDuration(parseFloat(data.value));
	}

	function onDelayFromNumberChange(data: PropertyChangeData) {
		display_DelayFrom = data.value.toString();
		TimerSetting.DelayMin = parseFloat(data.value);
	}

	function onDelayToNumberChange(data: PropertyChangeData) {
		display_DelayTo = data.value.toString();
		TimerSetting.DelayMax = parseFloat(data.value);
	}
	function onBeepDurationChange(data: PropertyChangeData) {
		beepDuration = data.value;
		TimerSetting.BeepDuration = parseFloat(data.value);
		IPSCBluetooth.setIndicatorDuration(parseFloat(data.value));
	}
</script>

<frame>
	<page>
		<actionBar title="Timer Settings" />
		<stackLayout>
			<flexboxLayout id="stopplate_bluetooth_section">
				<label>Stop plate: </label>
				<button text="Scan" on:tap={onScanStopPlate} />
				<button text="Disconnect" on:tap={onDisconnectStopPlate} />
				<button text="Flash" on:tap={onFlashStopPlate} />
			</flexboxLayout>
			<flexboxLayout id="stopplate_indicator_section">
				<label>Stop plate indicator duration </label>
				<label>({StopPlateIndicatorDuration} sec):</label>
				<slider
					value={StopPlateIndicatorDuration}
					on:valueChange={onStopPlateIndicatorDurationChange}
					minValue="1"
					maxValue="10"
				/>
			</flexboxLayout>
			<flexboxLayout id="stopplate_delay">
				<label>Random delay: between </label>
				<textField
					text={display_DelayFrom}
					keyboardType="number"
					textDecoration={"underline"}
					on:textChange={onDelayFromNumberChange}
				/>
				<label>s and </label>
				<textField
					text={display_DelayTo}
					keyboardType="number"
					textDecoration={"underline"}
					on:textChange={onDelayToNumberChange}
				/>
				<label>s</label>
			</flexboxLayout>
			<flexboxLayout id="beep_duration">
				<label>Beep sound duration ({beepDuration} sec): </label>
				<slider
					value={beepDuration}
					on:valueChange={onBeepDurationChange}
					minValue="1"
					maxValue="10"
				/>
			</flexboxLayout>
			<stackLayout id="stopplate_list">
				<label>Stop plate list:</label>
				{#each stopplateList as item}
					<button on:tap={() => connectToStopPlate(item.UUID)}
						>{item.localName}</button
					>
				{/each}
			</stackLayout>
		</stackLayout>
	</page>
</frame>

<style scoped lang="scss">
	@import "../../../color.scss";

	frame,
	page {
		background-color: $majorBackgroundColor;
		height: 100%;
		width: 100%;
	}

	actionBar {
		background-color: $majorBackgroundColor;
		color: $majorColor;
	}

	flexboxLayout {
		padding: 20px;
	}

	label,
	textField {
		color: $majorColor;
		align-self: center;
	}
	textField {
		text-align: center;
		width: 200px;
	}
	#stopplate_indicator_section > slider {
		width: 30%;
	}
	#stopplate_bluetooth_section > button {
		font-size: 12px;
	}
	#beep_duration > slider {
		width: 40%;
		ruby-align: right;
	}
</style>

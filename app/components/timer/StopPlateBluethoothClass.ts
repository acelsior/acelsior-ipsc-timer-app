import { Bluetooth, ReadResult, Peripheral, getBluetoothInstance, } from "@nativescript-community/ble";

// import { android } from "@nativescript/core/application"

android.bluetooth.BluetoothAdapter.class

export class IPSCBluetooth {
	private static hit_event: ((hit_data: ReadResult) => void)[]
	static bluetooth = getBluetoothInstance();
	static connected = false;
	static stopPlatePeripheralUUID: string = "";


	static async scanStopPlate(): Promise<Peripheral[]> {
		console.log("scanStopPlate");
		return new Promise((resolve, reject) => {
			let stopPlateList: Peripheral[] = []
			this.bluetooth.clear();
			this.bluetooth.stopScanning();
			this.bluetooth.startScanning({
				seconds: 1,
				filters: [{ serviceUUID: "1b2c" }],
				onDiscovered: (peripheral: Peripheral) => {
					stopPlateList.push(peripheral)
				},
			});
			setTimeout(() => {
				this.bluetooth.stopScanning();
				resolve(stopPlateList)
			}, 1100);
		})
	}

	static async connect(uuid: string) {
		await this.bluetooth.connect({
			UUID: uuid,
			onConnected: (data) => {
				console.log(`Connect to ${data.UUID}`)
				this.stopPlatePeripheralUUID = data.UUID
				this.connected = true
				this.bluetooth.discoverAll({
					peripheralUUID: this.stopPlatePeripheralUUID
				})
			},
			onDisconnected: (data) => {
				console.log(`Disconnect from ${data.UUID}`)
				this.connected = false
				this.bluetooth.clear();
			},
		});
	}

	static async flash() {
		if (!this.connected) return;
		await this.bluetooth.write({
			characteristicUUID: "f1a5",
			serviceUUID: "1b2c",
			peripheralUUID: this.stopPlatePeripheralUUID,
			value: 0x01, //must send as byte !!!!!!!!!
		})
	}

	static async disconnect() {
		this.bluetooth.disconnect({
			UUID: this.stopPlatePeripheralUUID
		});
		this.bluetooth.clear();
		this.connected = false;
	}

	static async setIndicatorDuration(duration: number) {
		if (!this.connected) return;
		await this.bluetooth.write({
			characteristicUUID: "117d",
			serviceUUID: "1b2c",
			peripheralUUID: this.stopPlatePeripheralUUID,
			value: duration, //must send as byte !!!!!!!!!
		})
	}

	static async registerHitEvent(func: (hit_data: ReadResult) => void) {
		if (!this.connected) return;
		this.bluetooth.read({ //idk what does this function for but when i remove it the this.bluetooth.startNotifying will stop working
			characteristicUUID: "0739",
			serviceUUID: "1b2c",
			peripheralUUID: this.stopPlatePeripheralUUID
		})
		await this.bluetooth.startNotifying({
			characteristicUUID: "0739",
			serviceUUID: "1b2c",
			peripheralUUID: this.stopPlatePeripheralUUID,
			onNotify(data) {
				func(data)
			},
		})
	}

	static async unregisterHitEvent() {
		if (!this.connected) return;
		await this.bluetooth.stopNotifying({
			characteristicUUID: "0739",
			serviceUUID: "1b2c",
			peripheralUUID: this.stopPlatePeripheralUUID,
		})
	}
}

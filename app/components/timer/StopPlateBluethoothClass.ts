import { Bluetooth, ReadResult, Peripheral, } from "@nativescript-community/ble";

export class IPSCBluetooth {
	bluetooth: Bluetooth;
	stopPlatePeripheralUUID: string;
	connected: boolean = false;
	private _eventListenerList: Array<Function> = [];

	constructor() {
		this.bluetooth = new Bluetooth();
		this.stopPlatePeripheralUUID = "";
	}

	async connect() {
		await this.bluetooth.startScanning({
			seconds: 4,
			filters: [{ serviceUUID: "1b2c" }],
			onDiscovered: (peripheral: Peripheral) => {
				this.stopPlatePeripheralUUID = peripheral.UUID;
				this.bluetooth.stopScanning()
			},
		});
		await this.bluetooth.connect({
			UUID: this.stopPlatePeripheralUUID,
			onConnected: () => {
				this.connected = true;
				console.log("connected to: ",this.stopPlatePeripheralUUID);
			},
			onDisconnected: () => {
				this.connected = false;
				console.log("disconnected from: ",this.stopPlatePeripheralUUID);
			},
		});
		function logBigStringToConsole(string: string) {
			const maxConsoleStringLength = 900; // The actual max length isn't clear.

			const length = string.length;

			if (length < maxConsoleStringLength) {
				console.log(string);
			} else {
				console.log(string.substring(0, maxConsoleStringLength));
				logBigStringToConsole(string.substring(maxConsoleStringLength));
			}
		}
		this.bluetooth
			.discoverAll({
				peripheralUUID: this.stopPlatePeripheralUUID,
			})
			.then((data) => {
				logBigStringToConsole(
					JSON.stringify(data, null, 4)
				);
			});
		await this.bluetooth.startNotifying({
			characteristicUUID: "0739",
			peripheralUUID: this.stopPlatePeripheralUUID,
			serviceUUID: "1b2c",
			onNotify: (data: ReadResult) => {
				console.log("trigger","0739")
				this._eventListenerList.forEach((func) => {
					func(data);
				})
			}
		})
	}

	onHit(func: (data: ReadResult) => void) {
		this._eventListenerList.push(func);
	}
}

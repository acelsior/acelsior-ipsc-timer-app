import { ApplicationSettings } from "@nativescript/core"

export class TimerSetting {
	private static change_event: Function[] = []

	static onSettingsChanged(func: Function): void {
		this.change_event.push(func)
	}

	private static callChangeEvent(): void {
		this.change_event.forEach((func) => {
			func();
		})
	}

	static set DelayMin (time: number){
		time = isNaN(time) ? 0 : time
		ApplicationSettings.setNumber("timer:DelayMin", time);
		ApplicationSettings.flush()
		console.log("timer:DelayMin changed to", ApplicationSettings.getNumber("timer:DelayMin"));
		this.callChangeEvent()
	}
	static get DelayMin (){
		return ApplicationSettings.getNumber("timer:DelayMin", 1);
	}

	static set DelayMax (time: number){
		time = isNaN(time) ? 0 : time
		ApplicationSettings.setNumber("timer:DelayMax", time);
		ApplicationSettings.flush()
		console.log("timer:DelayMax changed to", ApplicationSettings.getNumber("timer:DelayMax"));
		this.callChangeEvent()
	}
	static get DelayMax (){
		return ApplicationSettings.getNumber("timer:DelayMax", 1);
	}

	static set StopPlateIndicatorDuration (duration: number){
		ApplicationSettings.setNumber("timer:StopPlateIndicatorDuration", duration)
		ApplicationSettings.flush()
		console.log("timer:StopPlateIndicatorDuration changed to", ApplicationSettings.getNumber("timer:StopPlateIndicatorDuration"));
		this.callChangeEvent()
	}
	static get StopPlateIndicatorDuration (){
		return ApplicationSettings.getNumber("timer:StopPlateIndicatorDuration", 1)
	}

	static set BeepDuration (duration: number){
		ApplicationSettings.setNumber("timer:BeepDuration", duration)
		ApplicationSettings.flush()
		console.log("timer:BeepDuration changed to", ApplicationSettings.getNumber("timer:BeepDuration"));
		this.callChangeEvent()
	}
	static get BeepDuration (){
		return ApplicationSettings.getNumber("timer:BeepDuration", 1)
	}

	static set isManualStopEnable (enable: boolean){
		ApplicationSettings.setBoolean("timer:isManualStopEnable", enable)
		ApplicationSettings.flush()
		console.log("timer:isManualStopEnable changed to", ApplicationSettings.getNumber("timer:BeepDuration"));
		this.callChangeEvent()
	}
	static get isManualStopEnable (){
		return ApplicationSettings.getBoolean("timer:isManualStopEnable", false)
	}

}

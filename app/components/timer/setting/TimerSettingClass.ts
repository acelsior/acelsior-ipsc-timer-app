import { ApplicationSettings } from "@nativescript/core"

export class TimerSetting {
	static set DelayMin (time: number){
		time = isNaN(time) ? 0 : time
		ApplicationSettings.setNumber("timer:DelayMin", time);
		ApplicationSettings.flush()
		console.log("timer:DelayMin changed to", ApplicationSettings.getNumber("timer:DelayMin"));
	}
	static get DelayMin (){
		return ApplicationSettings.getNumber("timer:DelayMin", 1);
	}

	static set DelayMax (time: number){
		time = isNaN(time) ? 0 : time
		ApplicationSettings.setNumber("timer:DelayMax", time);
		ApplicationSettings.flush()
		console.log("timer:DelayMax changed to", ApplicationSettings.getNumber("timer:DelayMax"));
	}
	static get DelayMax (){
		return ApplicationSettings.getNumber("timer:DelayMax", 1);
	}

	static set StopPlateIndicatorDuration (duration: number){
		ApplicationSettings.setNumber("timer:StopPlateIndicatorDuration", duration)
		ApplicationSettings.flush()
		console.log("timer:StopPlateIndicatorDuration changed to", ApplicationSettings.getNumber("timer:StopPlateIndicatorDuration"));

	}
	static get StopPlateIndicatorDuration (){
		return ApplicationSettings.getNumber("timer:StopPlateIndicatorDuration", 1)
	}
}

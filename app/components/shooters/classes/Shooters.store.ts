function encodeObject(object: any): string {
	return JSON.stringify(object);
}

import { ApplicationSettings } from "@nativescript/core"
import { IShooter, Shooter, ShooterID } from "./Shooters.type";


export class ShooterStore {
	static event_list: Function[] = []

	static onSettingsChanged(func: Function) {
		this.event_list.push(func);
	}

	private static TriggerSettingsChange() {
		this.event_list.forEach((fn) => {
			fn()
		})
	}

	static StoreShooter(shooter: Shooter) {
		ApplicationSettings.setString(`shooterStore:${shooter.shooter_id}`, encodeObject(shooter))
		const str_shooter_list = ApplicationSettings.getString(`shooterStore:shooterList`, "[]")
		const shooterList = JSON.parse(str_shooter_list)
		shooterList.push(shooter.shooter_id)
		ApplicationSettings.setString(`shooterStore:shooterList`, JSON.stringify(shooterList))
		this.TriggerSettingsChange()
	}

	static DeleteShooter(shooterId: ShooterID) {
		ApplicationSettings.remove(`shooterStore:${shooterId}`)
		const str_shooter_list = ApplicationSettings.getString(`shooterStore:shooterList`, "[]")
		const shooterList = JSON.parse(str_shooter_list) as ShooterID[]
		shooterList.splice(shooterList.indexOf(shooterId),shooterList.indexOf(shooterId))
		ApplicationSettings.setString(`shooterStore:shooterList`, JSON.stringify(shooterList))
		console.log(shooterList)
		this.TriggerSettingsChange()

	}

	static ChangeShooter(shooter: Shooter) {
		console.log(encodeObject(shooter), shooter.name)
		ApplicationSettings.setString(`shooterStore:${shooter.shooter_id}`, encodeObject(shooter))
		this.TriggerSettingsChange()
	}

	static GetAllShooter(): Shooter[] {
		var shooterList: Shooter[] = []
		const shootersId: ShooterID[] = JSON.parse(ApplicationSettings.getString(`shooterStore:shooterList`, "[]"))
		shootersId.forEach(shooterId => {
			shooterList.push(Shooter.GetShooter(shooterId))
		});
		return shooterList;
	}

	static GetShooterById(shooterId: ShooterID): IShooter {
		return JSON.parse(ApplicationSettings.getString(`shooterStore:${shooterId}`))
	}
}

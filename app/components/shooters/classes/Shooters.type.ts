import { ShooterStore } from "./Shooters.store";



type ShooterID_Backstring = string;
export type ShooterID = `shooter:${ShooterID_Backstring}`;

const Snowflake = require('snowflake-id/dist/snowflake-id.min.js');
const snowflake = new Snowflake({
    mid : 42,
    offset : (new Date().getFullYear()-1970)*31536000*1000 //generate offset
});

export type Division = "Open" | "Standard" | "Production" | "Production Optics" | "Classic"
export const Division = {
	Open: "Open" ,
	Standard: "Standard" ,
	Production: "Production" ,
	ProductionOptic: "Production Optics",
	Classic: "Classic"
}

export interface IShooter {
	shooter_id: ShooterID;
	name: string;
	division: Division;
}

/**
 * Each shooter has a unique identifier (id) which can be used to do of the action in this class
 * Every action (static) only can pass (id) as the identifier
 * Identifier use Snowflake algorithm to generate which can't be repeated
 */
export class Shooter implements IShooter {
	shooter_id: ShooterID;
	name: string;
	division: Division;

	private constructor(shooter_id: ShooterID, name: string, division: Division) {
		this.shooter_id = shooter_id
		this.name = name;
		this.division = division
	}

	setName(newName: string) {
		this.name = newName
		ShooterStore.ChangeShooter(this)
	}
	setDivision(newDivision: Division) {
		this.division = newDivision
		ShooterStore.ChangeShooter(this)
	}

	//#region static methods and properties
	static GenerateUniqueID(): ShooterID {
		return `shooter:${snowflake.generate()}`;
	}

	static GetShooter(shooter_id: ShooterID) {
		const storedShooter = ShooterStore.GetShooterById(shooter_id)
		return new Shooter(shooter_id, storedShooter.name, storedShooter.division);
	}

	static CreateShooter(option: ICreateShooter) {
		ShooterStore.StoreShooter(new Shooter(this.GenerateUniqueID(), option.name, option.division))
	}

	static DeleteShooter(shooter_id: ShooterID) {
		ShooterStore.DeleteShooter(shooter_id)
	}
	//#endregion
}

export interface ICreateShooter {
	division: Division;
	name: string;
}

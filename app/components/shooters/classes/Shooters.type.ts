


type ShooterID_Backstring = string;
export type ShooterID = `shooter:${ShooterID_Backstring}`;

const Snowflake = require('snowflake-id/dist/snowflake-id.min.js');
const snowflake = new Snowflake({
    mid : 42,
    offset : (new Date().getFullYear()-1970)*31536000*1000 //generate offset
});

/**
 * Each shooter has a unique identifier (id) which can be used to do of the action in this class
 * Every action (static) only can pass (id) as the identifier
 * Identifier use Snowflake algorithm to generate which can't be repeated
 */
export class Shooter {
	private constructor() {

	}

	//#region static methods and properties
	static GenerateUniqueID(): ShooterID {
		return `shooter:${snowflake.generate()}`;
	}

	static GetShooter(shooter_id: ShooterID) {

	}

	static CreateShooter(option: ICreateShooter) {

	}
	//#endregion
}

export interface ICreateShooter {

}

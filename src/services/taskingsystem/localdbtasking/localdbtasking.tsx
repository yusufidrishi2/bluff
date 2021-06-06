
import { IPlayerData } from "../../model/playerdata";

export class LocalDBTasking {

    constructor() {
    }

    fetchDataFromLocalDB(): Promise<bigint|null> {
        throw Error("Subclass of LocalDBTasking class must implement fetchDataFromLocalDB function");
    }

    saveUserDataToLocalDB(serialisedUserData: IPlayerData): Promise<any> {
        throw Error("Subclass of LocalDBTasking class must implement saveUserDataToLocalDB function");
    }
}

import { IPlayerData } from "../../model/playerdata";

export class LocalDBTasking {

    constructor() {
    }

    fetchDataFromLocalDB(): Promise<bigint|null> {
        throw Error("Subclass of LocalDBTasking class must implement fetchDataFromLocalDB function");
    }

    savePlayerDataToLocalDB(serialisedPlayerData: IPlayerData): Promise<any> {
        throw Error("Subclass of LocalDBTasking class must implement savePlayerDataToLocalDB function");
    }
}
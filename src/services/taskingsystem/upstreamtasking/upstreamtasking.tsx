
import { IPlayerData, PlayerData } from "../../model/playerdata";

export class UpstreamTasking {

    constructor() {
    }

    saveUserDataToUpstream(serialisedUserData: IPlayerData): Promise<PlayerData> {
        throw Error("Subclass of UpstreamTasking class must implement saveUserDataToUpstream function");
    }

    fetchUserDataFromUpstream(userId: string): Promise<PlayerData> {
        throw Error("Subclass of UpstreamTasking class must implement fetchUserDataFromUpstream function");
    }
}
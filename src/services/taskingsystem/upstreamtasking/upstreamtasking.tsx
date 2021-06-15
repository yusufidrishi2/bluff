
import { IPlayerData, PlayerData } from "../../model/playerdata";
import { IFriendlyPlayerProfile, IJoiningFriendlyPlayerProfile, ServerNotification } from "../../model/taskdata";

export class UpstreamTasking {

    constructor() {
    }

    savePlayerDataToUpstream(serialisedPlayerData: IPlayerData): Promise<PlayerData> {
        throw Error("Subclass of UpstreamTasking class must implement savePlayerDataToUpstream function");
    }

    fetchPlayerDataFromUpstream(userId: string): Promise<PlayerData> {
        throw Error("Subclass of UpstreamTasking class must implement fetchPlayerDataFromUpstream function");
    }

    createFriendlyPlatform(friendlyPlayer: IFriendlyPlayerProfile): Promise<PlayerData> {
        throw Error("Subclass of UpstreamTasking class must implement createFriendlyPlatform function");
    }

    joinFriendlyPlatform(joiningFriendlyPlayer: IJoiningFriendlyPlayerProfile): Promise<ServerNotification> {
        throw Error("Subclass of UpstreamTasking class must implement joinFriendlyPlatform function");
    }
}
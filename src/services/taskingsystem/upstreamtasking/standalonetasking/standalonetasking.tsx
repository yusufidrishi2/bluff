
import { IPlayerData, PlayerData } from "../../../model/playerdata";
import { IFriendlyPlayerProfile } from "../../../model/taskdata";
import { UpstreamTasking } from "../upstreamtasking";

export class StandAloneTasking extends UpstreamTasking {

    constructor() {
        super();    
    }

    savePlayerDataToUpstream(serialisedPlayerData: IPlayerData): Promise<PlayerData> {
        return Promise.resolve(new PlayerData(serialisedPlayerData));
    }

    fetchPlayerDataFromUpstream(userId: string): Promise<PlayerData> {
        let exampleURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Small_Steering_wheel_icon.svg/1200px-Small_Steering_wheel_icon.svg.png';
        return Promise.resolve(
            new PlayerData(
                {
                    id: userId, 
                    playerName: 'MD. Yusuf Idrishi', 
                    dpUrl: new URL(exampleURL), 
                    points: '0'
                }
            )
        );
    }
    
    createFriendlyPlatform(friendlyPlayer: IFriendlyPlayerProfile) {
        return Promise.resolve() as any;
    }

    joinFriendlyPlatform(friendlyPlayer: IFriendlyPlayerProfile) {
        return Promise.resolve() as any;
    }
}

import { IPlayerData, PlayerData } from "../../../model/playerdata";
import { UpstreamTasking } from "../upstreamtasking";

export class StandAloneTasking extends UpstreamTasking {

    constructor() {
        super();    
    }

    saveUserDataToUpstream(serialisedUserData: IPlayerData): Promise<PlayerData> {
        return Promise.resolve(new PlayerData(serialisedUserData));
    }

    fetchUserDataFromUpstream(userId: string): Promise<PlayerData> {
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
}
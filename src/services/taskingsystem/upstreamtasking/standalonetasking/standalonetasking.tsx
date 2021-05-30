import { IUserData, UserData } from "../../../model/userdata";
import { UpstreamTasking } from "../upstreamtasking";

export class StandAloneTasking extends UpstreamTasking {

    constructor() {
        super();    
    }

    saveUserDataToUpstream(serialisedUserData: IUserData) {
        return true;
    }

    fetchUserDataFromUpstream(userId: number): Promise<UserData> {
        let exampleURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Small_Steering_wheel_icon.svg/1200px-Small_Steering_wheel_icon.svg.png';
        return Promise.resolve(new UserData({id: userId, name: "MD. Yusuf Idrishi", dpUrl: new URL(exampleURL), points: 0}));
    }
}
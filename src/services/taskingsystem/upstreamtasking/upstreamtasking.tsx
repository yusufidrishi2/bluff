import { IUserData, UserData } from "../../model/userdata";

export class UpstreamTasking {

    constructor() {
    }

    saveUserDataToUpstream(serialisedUserData: IUserData) {
        throw Error("Subclass of UpstreamTasking class must implement saveUserDataToUpstream function");
    }

    fetchUserDataFromUpstream(userId: number): Promise<UserData> {
        throw Error("Subclass of UpstreamTasking class must implement fetchUserDataFromUpstream function");
    }
}
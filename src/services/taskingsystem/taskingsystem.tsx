import { IUserData, UserData } from "../model/userdata";
import { LocalDBTasking } from "./localdbtasking/localdbtasking";
import { WebBrowser } from "./localdbtasking/webbrowser/webbrowser";
import { StandAloneTasking } from "./upstreamtasking/standalonetasking/standalonetasking";
import { UpstreamTasking } from "./upstreamtasking/upstreamtasking";


export class TaskingSystem {

    private _userData: UserData;

    private _localDBTasking: LocalDBTasking;

    private _upstreanDBTasking: UpstreamTasking;

    constructor() {
        this._userData = new UserData();
        this._localDBTasking = null as any;
        this._upstreanDBTasking = null as any;
        if ((window as any).__env.LOCAL_TASKING_SYSTEM === "WEB_BROWSER") {
            this._localDBTasking = new WebBrowser();
        }
        if ((window as any).__env.UPSTREAM_TASKING_SYSTEM === "STANDALONE") {
            this._upstreanDBTasking = new StandAloneTasking();
        }
    }

    isAlreadyLoggedIn(): Promise<UserData|null> {
        return this._localDBTasking.fetchDataFromLocalDB()
            .then(userId => {
                if (userId) {
                    this._userData.setId(userId);
                    return this._userData;
                } else {
                    return null;
                }
            });
    }

    saveUserData(userData: UserData) {
        this._userData = userData;
        let serialisedUserData: IUserData = userData.getSerialisedData();
        this._localDBTasking.saveUserDataToLocalDB(serialisedUserData);
        this._upstreanDBTasking.saveUserDataToUpstream(serialisedUserData);
    }

    getUpstreamInstance(): UpstreamTasking {
        return this._upstreanDBTasking;
    }
}
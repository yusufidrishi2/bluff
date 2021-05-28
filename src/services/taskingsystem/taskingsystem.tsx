import { IUserData, UserData } from "../model/userdata";
import { LocalDBTasking } from "./localdbtasking/localdbtasking";
import { WebBrowser } from "./localdbtasking/webbrowser/webbrowser";


export class TaskingSystem {

    private _userData: UserData;

    private _localDBTasking: LocalDBTasking;

    constructor() {
        this._userData = new UserData();
        this._localDBTasking = null as any;
        if ((window as any).__env.TASKING_SYSTEM === "WEB_BROWSER") {
            this._localDBTasking = new WebBrowser();
        }
    }

    isLogingNeeded(): Promise<boolean> {
        return this._localDBTasking.fetchDataFromLocalDB()
            .then(userId => {
                this._userData.setUserId(userId);
            }).then(() => {
                if (this._userData.getUserId()) {
                    return false;
                } else {
                    return true;
                }
            });
    }

    /**
     * @function fetchUserData Fetch the user data from the server
     * @returns Boolean value which tells whether the data is available or not
     */
    fetchUserDataFromUpstream(): Promise<UserData> {
        return new Promise((resolve, reject) => {
            
        })
    }

    saveUserData(userData: UserData) {
        this._userData = userData;
        let serialisedUserData: IUserData = userData.getSerialisedData();
        this._localDBTasking.saveUserDataToLocalDB(serialisedUserData);
        this.saveUserDataToUpstream(serialisedUserData);
    }

    private saveUserDataToUpstream(serialisedUserData: IUserData) {

    }
}
import { IUserData, UserData } from "../../../model/userdata";
import { LocalDBTasking } from "../localdbtasking";

export class WebBrowser extends LocalDBTasking {

    constructor() {
        super();
    }

    fetchDataFromLocalDB(): Promise<number|null> {
        let localUserId: number = parseInt(window.localStorage.getItem('userdata')!);
        return Promise.resolve(localUserId);
    }

    saveUserDataToLocalDB(serialisedUserData: IUserData): Promise<any> {
        window.localStorage.setItem('userdata', String(serialisedUserData.userId));
        return Promise.resolve();
    }
}
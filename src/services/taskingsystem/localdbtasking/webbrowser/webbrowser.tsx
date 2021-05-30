import { IUserData, UserData } from "../../../model/userdata";
import { LocalDBTasking } from "../localdbtasking";

export class WebBrowser extends LocalDBTasking {

    constructor() {
        super();
    }

    fetchDataFromLocalDB(): Promise<number|null> {
        let localUserId: number = parseInt(window.localStorage.getItem('userid')!);
        return Promise.resolve(localUserId);
    }

    saveUserDataToLocalDB(serialisedUserData: IUserData): Promise<any> {
        window.localStorage.setItem('userid', String(serialisedUserData.id));
        return Promise.resolve();
    }
}
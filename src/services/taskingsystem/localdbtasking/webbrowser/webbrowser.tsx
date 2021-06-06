
import { IPlayerData } from "../../../model/playerdata";
import { LocalDBTasking } from "../localdbtasking";
import { Utils } from "../../../utils/utils";

export class WebBrowser extends LocalDBTasking {

    constructor() {
        super();
    }

    fetchDataFromLocalDB(): Promise<bigint|null> {
        let encryptedData = window.localStorage.getItem('userid')!;
        let decreptedData = encryptedData ? BigInt(Utils.decryptData(encryptedData)) : BigInt(0);
        return Promise.resolve(decreptedData);
    }

    saveUserDataToLocalDB(serialisedUserData: IPlayerData): Promise<any> {
        let encryptedPlayerId = Utils.encryptData(String(serialisedUserData.id));
        window.localStorage.setItem('userid', encryptedPlayerId);
        return Promise.resolve();
    }
}
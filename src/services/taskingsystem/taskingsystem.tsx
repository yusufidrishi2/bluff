import { ObjectId } from "bson";
import { IPlayerData, PlayerData } from "../model/playerdata";
import { LocalDBTasking } from "./localdbtasking/localdbtasking";
import { WebBrowser } from "./localdbtasking/webbrowser/webbrowser";
import { MongoDBTasking } from "./upstreamtasking/mongodbtasking/mongodbtasking";
import { StandAloneTasking } from "./upstreamtasking/standalonetasking/standalonetasking";
import { UpstreamTasking } from "./upstreamtasking/upstreamtasking";


export class TaskingSystem {

    private _playerData: PlayerData;

    private _localDBTasking: LocalDBTasking;

    private _upstreanDBTasking: UpstreamTasking;

    constructor() {
        this._playerData = new PlayerData();
        this._localDBTasking = null as any;
        this._upstreanDBTasking = null as any;
        if ((window as any).__env.LOCAL_TASKING_SYSTEM === "WEB_BROWSER") {
            this._localDBTasking = new WebBrowser();
        }
        if ((window as any).__env.UPSTREAM_TASKING_SYSTEM === "STANDALONE") {
            this._upstreanDBTasking = new StandAloneTasking();
        } else if ((window as any).__env.UPSTREAM_TASKING_SYSTEM === "MONGO_DB") {
            this._upstreanDBTasking = new MongoDBTasking();
        }
    }

    isAlreadyLoggedIn(): Promise<PlayerData|null> {
        return this._localDBTasking.fetchDataFromLocalDB()
            .then(userId => {
                if (userId) {
                    this._playerData.setId(userId);
                    return this._playerData;
                } else {
                    return null;
                }
            });
    }

    saveUserData(playerData: PlayerData) {
        this._playerData = playerData;
        let serialisedUserData: IPlayerData = playerData.getSerialisedData();
        this._localDBTasking.saveUserDataToLocalDB(serialisedUserData);
        this._upstreanDBTasking.saveUserDataToUpstream(serialisedUserData);
    }

    getUpstreamInstance(): UpstreamTasking {
        return this._upstreanDBTasking;
    }
}
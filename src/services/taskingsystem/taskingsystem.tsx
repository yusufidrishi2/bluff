import { IPlayerData, PlayerData } from "../model/playerdata";
import { IFriendlyPlayerProfile, IJoiningFriendlyPlayerProfile, IPlayerGameResponse } from "../model/taskdata";
import { LocalDBTasking } from "./localdbtasking/localdbtasking";
import { WebBrowser } from "./localdbtasking/webbrowser/webbrowser";
import { SpringServer } from "./upstreamtasking/springserver/springserver";
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
        } else if ((window as any).__env.UPSTREAM_TASKING_SYSTEM === "SPRING_SERVER") {
            this._upstreanDBTasking = new SpringServer();
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

    savePlayerData(playerData: PlayerData) {
        this._playerData = playerData;
        let serialisedPlayerData: IPlayerData = playerData.getSerialisedData();
        this._localDBTasking.savePlayerDataToLocalDB(serialisedPlayerData);
        this._upstreanDBTasking.savePlayerDataToUpstream(serialisedPlayerData);
    }

    getUpstreamInstance(): UpstreamTasking {
        return this._upstreanDBTasking;
    }

    createFriendlyPlatform(friendlyPlayer: IFriendlyPlayerProfile) {
        return this._upstreanDBTasking.createFriendlyPlatform(friendlyPlayer);
    }

    joinFriendlyPlatform(joiningFriendlyPlayer: IJoiningFriendlyPlayerProfile) {
        return this._upstreanDBTasking.joinFriendlyPlatform(joiningFriendlyPlayer);
    }

    sendPlayerGameResponse(playerGameResponse: IPlayerGameResponse) {
        return this._upstreanDBTasking.sendPlayerGameResponse(playerGameResponse);
    }
}
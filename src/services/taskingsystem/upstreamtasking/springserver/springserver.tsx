
import { IPlayerData, PlayerData } from "../../../model/playerdata";
import { UpstreamTasking } from "../upstreamtasking";
import { Utils } from "../../../utils/utils";
import { IFriendlyPlayerProfile, IJoiningFriendlyPlayerProfile, IPlayerGameResponse, ServerNotification } from "../../../model/taskdata";

export class SpringServer extends UpstreamTasking {

    constructor() {
        super();    
    }

    savePlayerDataToUpstream(serialisedPlayerData: IPlayerData): Promise<PlayerData> {
        return this.getJSONxhr((window as any).__env.BASE_URL + '/login', 'POST', JSON.stringify(serialisedPlayerData))
            .then((data: any) => {
                return new PlayerData(data);
            });
    }

    fetchPlayerDataFromUpstream(userId: string): Promise<PlayerData> {
        let encryptedUserId = Utils.encryptData(userId);
        return this.getJSONxhr((window as any).__env.BASE_URL + '/' + encryptedUserId, 'GET')
            .then((data: any) => {
                return new PlayerData(data);
            });
    }

    createFriendlyPlatform(friendlyPlayer: IFriendlyPlayerProfile) {
        return this.getJSONxhr((window as any).__env.BASE_URL + '/create-friendly-game', 'POST', JSON.stringify(friendlyPlayer))
            .then((data: any) => {
                return new PlayerData(data);
            });
    }

    joinFriendlyPlatform(friendlyPlayer: IJoiningFriendlyPlayerProfile) {
        return this.getJSONxhr((window as any).__env.BASE_URL + '/request-friendly-game', 'POST', JSON.stringify(friendlyPlayer))
            .then((data: ServerNotification) => {
                return data; 
            });
    }

    sendPlayerGameResponse(playerGameResponse: IPlayerGameResponse) {
        return this.getJSONxhr((window as any).__env.BASE_URL + '/player-game-response', 'POST', JSON.stringify(playerGameResponse))
            .then((data: ServerNotification) => {
                return data; 
            });
    }

    /**
     * Function to make the API call to get the signed image url
     * @param url Endpoint of the API
     * @param authtoken Contains the authentication token
     * @param parameters Parameters for the call
     * @param method Method of the API call
     */
     private getJSONxhr(url: string, method: string, parameters: string = "", authtoken: string = ""): Promise<any> {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(method, url, true);
            request.setRequestHeader("content-type", "application/json");
            request.onreadystatechange = function(e) {
                if (request.readyState == 4) {
                    let status = request.status;
                    if (status == 200) {
                        let data = request.responseText.trim() ? JSON.parse(request.responseText.trim()) : "";
                        resolve(data);
                    } else {
                        reject(status);
                    }
                }
            };
            if (method === "POST") {
                request.send(parameters);
            } else if (method === "GET") {
                request.send();
            }
        });
    }   
}

import { IPlayerData, PlayerData } from "../../../model/playerdata";
import { UpstreamTasking } from "../upstreamtasking";
import { Utils } from "../../../utils/utils";

export class MongoDBTasking extends UpstreamTasking {

    constructor() {
        super();    
    }

    saveUserDataToUpstream(serialisedUserData: IPlayerData): Promise<PlayerData> {
        return this.getJSONxhr((window as any).__env.BASE_URL, 'POST', JSON.stringify(serialisedUserData))
            .then((data: any) => {
                return new PlayerData(data);
            });
    }

    fetchUserDataFromUpstream(userId: string): Promise<PlayerData> {
        let encryptedUserId = Utils.encryptData(userId);
        return this.getJSONxhr((window as any).__env.BASE_URL + '/' + encryptedUserId, 'GET')
            .then((data: any) => {
                return new PlayerData(data);
            });
    }

    /**
     * Function to make the API call to get the signed image url
     * @param url Endpoint of the API
     * @param authtoken Contains the authentication token
     * @param parameters Parameters for the call
     * @param method Method of the API call
     */
     private getJSONxhr(url: string, method: string, parameters: string = "", authtoken: string = "") {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(method, url, true);
            request.setRequestHeader("content-type", "application/json");
            request.onreadystatechange = function(e) {
                if (request.readyState == 4) {
                    let status = request.status;
                    if (status == 200) {
                        let data = JSON.parse(request.responseText);
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
import { App, APP_ELEMENTS } from "../../services/app/app";
import { GAME_TYPES, IFriendlyPlayerProfile, IJoiningFriendlyPlayerProfile, UserInputData } from "../../services/model/taskdata";
import { IPlayerData, PlayerData } from "../../services/model/playerdata";
import { MyOwnTSX } from "../../services/utils/myowntsx";
import * as Stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';
import { TaskingSystem } from "../../services/taskingsystem/taskingsystem";

export class GameController {
    
    private playerData: PlayerData;

    private gameType: UserInputData;

    private allPlayers: IPlayerData[];

    private taskingSystem: TaskingSystem;

    constructor(playerData: PlayerData, gameType: UserInputData) {
        this.playerData = playerData;
        this.gameType = gameType;
        this.allPlayers = [];
        this.taskingSystem = App.getTaskingSystem();
        this.start();
    }

    private start() {
        this.loadUIComponent();
        this.startOperations();
    }

    private startOperations() {
        let joiningCode = this.gameType.mode === GAME_TYPES.NEW_GAME_WITH_FRIENDS ? String(Date.now()) : this.gameType.data;
        this.connectToServer(joiningCode)
            .then(() => {
                switch(this.gameType.mode) {
                    case GAME_TYPES.NEW_GAME_WITH_FRIENDS:
                        let friendlyPlayer: IFriendlyPlayerProfile = {
                            playersAllowed: this.gameType.data,
                            joiningCode: joiningCode,
                            id: this.playerData.getId()!.toString(),
                            points: this.playerData.getPoints()!.toString(),
                            playerName: this.playerData.getPlayerName()!,
                            dpUrl: this.playerData.getDpURL()!
                        }
                        this.taskingSystem.createFriendlyPlatform(friendlyPlayer);
                    break;
                    case GAME_TYPES.JOIN_EXISTING_GAME:
                        let joiningFriendlyPlayer: IJoiningFriendlyPlayerProfile = {
                            joiningCode: joiningCode,
                            id: this.playerData.getId()!.toString(),
                            points: this.playerData.getPoints()!.toString(),
                            playerName: this.playerData.getPlayerName()!,
                            dpUrl: this.playerData.getDpURL()!
                        }
                        this.taskingSystem.joinFriendlyPlatform(joiningFriendlyPlayer);
                        break;
                    case GAME_TYPES.GAME_WITH_RANDOM:
                        break;
                }
            });
    }

    private connectToServer(joiningCode: string): Promise<void> {
        let socket = new SockJS('http://localhost:8091/websocket-example');
        let stompClient = Stompjs.over(socket);
        return new Promise((resolve, reject) => {
            stompClient.connect({}, (frame: any) => {
                stompClient.subscribe('/topic/join-friendly-game/'+joiningCode, (newPlayer: any) => {
                    this.allPlayers.push(newPlayer);
                });
                resolve();
            });
        })
    }

    private loadUIComponent() {
        let element: HTMLElement = document.getElementById(APP_ELEMENTS.MAIN_AREA)!;
        let view = (
            <div class="mid-target bg-design-game-controller">
                <span class="loader-container">
                    <div class="loader"></div>
                </span>
                <small class="footer">A game by IntellectI</small>
            </div>
        );
        element.appendChild(view);
    }

}

enum GAME_CONTROLLER_ELEMENTS {
    CONTENT_AREA = 'content-area'
}
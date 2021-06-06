import { APP_ELEMENTS } from "../../services/app/app";
import { UserInputData } from "../../services/model/taskdata";
import { PlayerData } from "../../services/model/playerdata";
import { MyOwnTSX } from "../../services/utils/myowntsx";

export class GameController {
    
    constructor(playerData: PlayerData, gameType: UserInputData) {
        this.start(playerData, gameType);
    }

    private start(playerData: PlayerData, gameType: UserInputData) {
        this.loadUIComponent(playerData, gameType);

        this.listenToWebSocket()
    }

    private listenToWebSocket() {
        
    }

    private loadUIComponent(playerData: PlayerData, gameType: UserInputData) {
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
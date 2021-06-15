import { MyOwnTSX } from "../../services/utils/myowntsx";
import { PlayerData } from "../../services/model/playerdata";
import { GameController } from "../gamecontroller/gamecontroller";
import { GAME_TYPES } from "../../services/model/taskdata";

export class SystemHandler {

    constructor(playerData: PlayerData, divName: string) {
        this.start(playerData, divName);
    }

    private start(playerData: PlayerData, divName: string) {
        this.loadUIComponent(playerData, divName);

        document.getElementById(SYSTEM_ELEMENTS.PLAY_WITH_FRIENDS)!.addEventListener('click', e => {
            document.getElementById(SYSTEM_ELEMENTS.POPUP_MODAL)!.style.removeProperty('display');
            document.getElementById(SYSTEM_ELEMENTS.SYSTEM_CONTENT)!.style.setProperty('display', 'none');
            this.renderForFriends(playerData);
        });

        document.getElementById(SYSTEM_ELEMENTS.PLAY_WITH_RANDOM)!.addEventListener('click', e => {
            document.getElementById(SYSTEM_ELEMENTS.POPUP_MODAL)!.style.removeProperty('display');
            document.getElementById(SYSTEM_ELEMENTS.SYSTEM_CONTENT)!.style.setProperty('display', 'none');
            this.renderForRandomFriends(playerData);
        });

        document.getElementById(SYSTEM_ELEMENTS.MODAL_CLOSE)!.addEventListener('click', e => {
            document.getElementById(SYSTEM_ELEMENTS.POPUP_MODAL)!.style.setProperty('display', 'none');
            document.getElementById(SYSTEM_ELEMENTS.SYSTEM_CONTENT)!.style.removeProperty('display');
        });
    }

    private registerForFriends(playerData: PlayerData) {
        document.getElementById(SYSTEM_ELEMENTS.START_NEW_GAME)!.addEventListener('click', e => {
            (document.getElementsByClassName('bg-design')[0]! as HTMLElement).style.setProperty("display", "none");
            
            let noOfPlayers = (document.getElementById(SYSTEM_ELEMENTS.NO_OF_PLAYERS_FRIENDS) as HTMLSelectElement)!;
            let selectedValue = 2;
            for (let i = 1; i < noOfPlayers.options.length; i++) {
                if (noOfPlayers.options[i].selected) {
                    selectedValue = parseInt(noOfPlayers.options[i].value);
                    break;
                }
            }
            new GameController(playerData, {mode: GAME_TYPES.NEW_GAME_WITH_FRIENDS, data: selectedValue});
        });

        document.getElementById(SYSTEM_ELEMENTS.JOIN_EXISTING_GAME_MODAL)!.addEventListener('click', e => {
            (document.getElementsByClassName('bg-design')[0]! as HTMLElement).style.setProperty("display", "none");
            let joinCode = (document.getElementById(SYSTEM_ELEMENTS.JOINING_CODE)! as HTMLTextAreaElement).value;
            new GameController(playerData, {mode: GAME_TYPES.JOIN_EXISTING_GAME, data: joinCode});
        });
    }

    private registerForRandoms(playerData: PlayerData) {
        document.getElementById(SYSTEM_ELEMENTS.START_RANDOM_GAME)!.addEventListener('click', e => {
            (document.getElementsByClassName('bg-design')[0]! as HTMLElement).style.setProperty("display", "none");
            
            let noOfPlayers = (document.getElementById(SYSTEM_ELEMENTS.NO_OF_PLAYERS_RANDOM) as HTMLSelectElement)!;
            let selectedValue = 2;
            for (let i = 1; i < noOfPlayers.options.length; i++) {
                if (noOfPlayers.options[i].selected) {
                    selectedValue = parseInt(noOfPlayers.options[i].value);
                    break;
                }
            }
            new GameController(playerData, {mode: GAME_TYPES.GAME_WITH_RANDOM, data: selectedValue});
        });
    }

    private renderForFriends(playerData: PlayerData) {
        let element: HTMLElement = document.getElementById(SYSTEM_ELEMENTS.POPUP_CONTENT)!;
        element.innerHTML = '';
        let players = []
        for (let i = 3; i <= 8; i++) {
            players.push(<option value={i}>{i}</option>);
        }
        let view = (
            <div>
                <div class="model-area-first">
                    <div class="code-area">
                        <span class="code-label float-left">SELECT NO. OF PLAYERS: </span>
                        <select id={SYSTEM_ELEMENTS.NO_OF_PLAYERS_FRIENDS} class="code-input float-left">
                            <option value="2" selected>2</option>
                            {players.map(element => element)}
                        </select>
                    </div>
                    <button id={SYSTEM_ELEMENTS.START_NEW_GAME} class="btn existing-game-btn">START NEW GAME</button>
                </div>
                <div class="model-area-second">
                    <div class="code-area">
                        <span class="code-label float-left">ENTER CODE: </span>
                        <textarea id={SYSTEM_ELEMENTS.JOINING_CODE} class="code-input float-left"></textarea>
                    </div>
                    <button id={SYSTEM_ELEMENTS.JOIN_EXISTING_GAME_MODAL} class="btn existing-game-btn">JOIN EXISTING GAME</button>
                </div>
            </div> 
        );
        element.appendChild(view);
        this.registerForFriends(playerData);
    }

    private renderForRandomFriends(playerData: PlayerData) {
        let element: HTMLElement = document.getElementById(SYSTEM_ELEMENTS.POPUP_CONTENT)!;
        element.innerHTML = '';
        let players = []
        for (let i = 3; i <= 8; i++) {
            players.push(<option value={i}>{i}</option>);
        }
        let view = (
            <div>
                <div class="model-area-first random-modal">
                    <div class="code-area">
                        <span class="code-label float-left">SELECT NO. OF PLAYERS: </span>
                        <select id={SYSTEM_ELEMENTS.NO_OF_PLAYERS_RANDOM} class="code-input float-left">
                            <option value="2" selected>2</option>
                            {players.map(element => element)}
                        </select>
                    </div>
                    <button id={SYSTEM_ELEMENTS.START_RANDOM_GAME} class="btn existing-game-btn">START THE GAME</button>
                </div>
            </div> 
        );
        element.appendChild(view);
        this.registerForRandoms(playerData);
    }

    private loadUIComponent(playerData: PlayerData, divName: string) {
        let element: HTMLElement = document.getElementById(divName)!;
        let view = (
            <div>
                <div id={SYSTEM_ELEMENTS.SYSTEM_CONTENT}>
                    <h2 class="main-system-heading font-change">WELCOME {playerData.getPlayerName()!.toUpperCase()}</h2>
                    <img class="dp-image" src={playerData.getDpURL()!.toString()}></img>
                    <br></br>
                    <div class="point-col">
                        <img src="../img/gold-coins.png" class="float-left coin-icon"></img>
                        <h3 class="points font-change float-left">COINS: 
                            <span class="no-coins">{String(playerData.getPoints())}</span>
                        </h3>
                    </div>
                    <br></br>
                    <button id={SYSTEM_ELEMENTS.PLAY_WITH_FRIENDS} class="btn play-friends-btn">PLAY WITH FRIENDS</button>
                    <br></br>
                    <button id={SYSTEM_ELEMENTS.PLAY_WITH_RANDOM} class="btn play-random-btn">PLAY WITH RANDOM PLAYERS</button>
                </div>
                <div id={SYSTEM_ELEMENTS.POPUP_MODAL} class="modal mid-target" style="display: none;">
                    <i id={SYSTEM_ELEMENTS.MODAL_CLOSE} class="fa fa-times cross-button btn" aria-hidden="true"></i>
                    <div id={SYSTEM_ELEMENTS.POPUP_CONTENT}></div>
                </div>
            </div>
        );
        element.appendChild(view);

        (document.getElementsByClassName('bg-design')[0]! as HTMLElement).style.setProperty("background-image", "url('../img/mainsystem.jpg')")
    }
}

enum SYSTEM_ELEMENTS {
    PLAY_WITH_FRIENDS = 'play-with-friends',
    PLAY_WITH_RANDOM = 'play-with-random',
    POPUP_MODAL = 'popup-modal',
    MODAL_CLOSE = 'modal-close',
    POPUP_CONTENT = 'popup-content',
    SYSTEM_CONTENT = 'login-page-content',
    START_NEW_GAME = 'start-game',
    JOIN_EXISTING_GAME_MODAL = 'join-existing-game-modal',
    JOINING_CODE = 'joining-code',
    START_RANDOM_GAME = 'start-random-game',
    NO_OF_PLAYERS_RANDOM = 'no-of-players-random',
    NO_OF_PLAYERS_FRIENDS = 'no-of-players-friends'
}
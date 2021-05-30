import { MyOwnTSX } from "../../services/utils/myowntsx";
import { UserData } from "../../services/model/userdata";

export class SystemHandler {

    constructor(userData: UserData, divName: string) {
        this.start(userData, divName);
    }

    private start(userData: UserData, divName: string) {
        this.loadUIComponent(userData, divName);

        document.getElementById(SYSTEM_ELEMENTS.PLAY_WITH_FRIENDS)!.addEventListener('click', e => {
            document.getElementById(SYSTEM_ELEMENTS.POPUP_MODAL)!.style.removeProperty('display');
            document.getElementById(SYSTEM_ELEMENTS.SYSTEM_CONTENT)!.style.setProperty('display', 'none');
            this.renderForFriends();
        })

        document.getElementById(SYSTEM_ELEMENTS.PLAY_WITH_RANDOM)!.addEventListener('click', e => {
            document.getElementById(SYSTEM_ELEMENTS.POPUP_MODAL)!.style.removeProperty('display');
            document.getElementById(SYSTEM_ELEMENTS.SYSTEM_CONTENT)!.style.setProperty('display', 'none');
            this.renderForRandomFriends();
        })

        document.getElementById(SYSTEM_ELEMENTS.MODAL_CLOSE)!.addEventListener('click', e => {
            document.getElementById(SYSTEM_ELEMENTS.POPUP_MODAL)!.style.setProperty('display', 'none');
            document.getElementById(SYSTEM_ELEMENTS.SYSTEM_CONTENT)!.style.removeProperty('display');
        })
    }

    private renderForFriends() {
        let element: HTMLElement = document.getElementById(SYSTEM_ELEMENTS.POPUP_CONTENT)!;
        element.innerHTML = '';
        let players = []
        for (let i = 1; i <= 8; i++) {
            players.push(<option value={i}>{i}</option>);
        }
        let view = (
            <div>
                <div class="model-area-first">
                    <div class="code-area">
                        <span class="code-label float-left">SELECT NO. OF PLAYERS: </span>
                        <select class="code-input float-left">
                            <option value="0" selected>--SELECT--</option>
                            {players.map(element => element)}
                        </select>
                    </div>
                    <button class="btn existing-game-btn">START NEW GAME</button>
                </div>
                <div class="model-area-second">
                    <div class="code-area">
                        <span class="code-label float-left">ENTER CODE: </span>
                        <textarea class="code-input float-left"></textarea>
                    </div>
                    <button class="btn existing-game-btn">JOIN EXISTING GAME</button>
                </div>
            </div> 
        );
        element.appendChild(view);
    }

    private renderForRandomFriends() {
        let element: HTMLElement = document.getElementById(SYSTEM_ELEMENTS.POPUP_CONTENT)!;
        element.innerHTML = '';
        let players = []
        for (let i = 1; i <= 8; i++) {
            players.push(<option value={i}>{i}</option>);
        }
        let view = (
            <div>
                <div class="model-area-first random-modal">
                    <div class="code-area">
                        <span class="code-label float-left">SELECT NO. OF PLAYERS: </span>
                        <select class="code-input float-left">
                            <option value="0" selected>--SELECT--</option>
                            {players.map(element => element)}
                        </select>
                    </div>
                    <button class="btn existing-game-btn">START THE GAME</button>
                </div>
            </div> 
        );
        element.appendChild(view);
    }

    private loadUIComponent(userData: UserData, divName: string) {
        let doc: HTMLElement = document.getElementById(divName)!;
        let view = (
            <div>
                <div id={SYSTEM_ELEMENTS.SYSTEM_CONTENT}>
                    <h2 class="main-system-heading font-change">WELCOME {userData.getName()!.toUpperCase()}</h2>
                    <img class="dp-image" src={userData.getDpURL()!.toString()}></img>
                    <br></br>
                    <div class="point-col">
                        <img src="../img/gold-coins.png" class="float-left coin-icon"></img>
                        <h3 class="points font-change float-left">COINS: 
                            <span class="no-coins">{String(userData.getPoints())}</span>
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
        doc.appendChild(view);

        (document.getElementsByClassName('bg-design')[0]! as HTMLElement).style.setProperty("background-image", "url('../img/mainsystem.jpg')")
    }
}

enum SYSTEM_ELEMENTS {
    PLAY_WITH_FRIENDS = 'play-with-friends',
    PLAY_WITH_RANDOM = 'play-with-random',
    POPUP_MODAL = 'popup-modal',
    MODAL_CLOSE = 'modal-close',
    POPUP_CONTENT = 'popup-content',
    SYSTEM_CONTENT = 'login-page-content'
}
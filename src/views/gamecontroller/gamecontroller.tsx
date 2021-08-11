import { App, APP_ELEMENTS } from "../../services/app/app";
import { GAME_TYPES, IFriendlyPlayerProfile, IJoiningFriendlyPlayerProfile, IPlayerGameResponse, ServerNotification, UserInputData } from "../../services/model/taskdata";
import { PlayerData } from "../../services/model/playerdata";
import { MyOwnTSX } from "../../services/utils/myowntsx";
import * as Stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';
import { TaskingSystem } from "../../services/taskingsystem/taskingsystem";
import { LoginHandler } from "../loginhandler/loginhandler";

export class GameController {
    
    private playerData: PlayerData;

    private gameType: UserInputData;

    private allPlayers: PlayerData[];

    private taskingSystem: TaskingSystem;

    private playerCardIndexes: Set<number>;

    private someButtonPressed: boolean;

    private joiningCode: string;

    private cardSet = [
        './img/cards/spade/ace_spade.png',
        './img/cards/spade/2_spade.png',
        './img/cards/spade/3_spade.png',
        './img/cards/spade/4_spade.png',
        './img/cards/spade/5_spade.png',
        './img/cards/spade/6_spade.png',
        './img/cards/spade/7_spade.png',
        './img/cards/spade/8_spade.png',
        './img/cards/spade/9_spade.png',
        './img/cards/spade/10_spade.png',
        './img/cards/spade/j_spade.png',
        './img/cards/spade/q_spade.png',
        './img/cards/spade/k_spade.png',

        './img/cards/club/ace_club.png',
        './img/cards/club/2_club.png',
        './img/cards/club/3_club.png',
        './img/cards/club/4_club.png',
        './img/cards/club/5_club.png',
        './img/cards/club/6_club.png',
        './img/cards/club/7_club.png',
        './img/cards/club/8_club.png',
        './img/cards/club/9_club.png',
        './img/cards/club/10_club.png',
        './img/cards/club/j_club.png',
        './img/cards/club/q_club.png',
        './img/cards/club/k_club.png',

        './img/cards/heart/ace_heart.png',
        './img/cards/heart/2_heart.png',
        './img/cards/heart/3_heart.png',
        './img/cards/heart/4_heart.png',
        './img/cards/heart/5_heart.png',
        './img/cards/heart/6_heart.png',
        './img/cards/heart/7_heart.png',
        './img/cards/heart/8_heart.png',
        './img/cards/heart/9_heart.png',
        './img/cards/heart/10_heart.png',
        './img/cards/heart/j_heart.png',
        './img/cards/heart/q_heart.png',
        './img/cards/heart/k_heart.png',

        './img/cards/diamond/ace_diamond.png',
        './img/cards/diamond/2_diamond.png',
        './img/cards/diamond/3_diamond.png',
        './img/cards/diamond/4_diamond.png',
        './img/cards/diamond/5_diamond.png',
        './img/cards/diamond/6_diamond.png',
        './img/cards/diamond/7_diamond.png',
        './img/cards/diamond/8_diamond.png',
        './img/cards/diamond/9_diamond.png',
        './img/cards/diamond/10_diamond.png',
        './img/cards/diamond/j_diamond.png',
        './img/cards/diamond/q_diamond.png',
        './img/cards/diamond/k_diamond.png',
    ]

    constructor(playerData: PlayerData, gameType: UserInputData) {
        this.playerData = playerData;
        this.gameType = gameType;
        this.allPlayers = [];
        this.playerCardIndexes = new Set<number>();
        this.someButtonPressed = false;
        this.taskingSystem = App.getTaskingSystem();
        this.joiningCode = '';
        this.start();
    }

    private start() {
        this.loadUIComponent();
        this.startOperations();
        
        document.getElementById(GAME_CONTROLLER_ELEMENTS.GAME_PLAY_MODAL)!.addEventListener('click', event => {
            setTimeout(() => {
                if (!this.someButtonPressed) {
                    this.deselectAllCards();
                }
                this.someButtonPressed = false
            })
        })

        document.getElementById(GAME_CONTROLLER_ELEMENTS.CLOSE_GAME_POPUP_MODAL)!.addEventListener('click', e => {
            this.someButtonPressed = true;
            this.clearPopUpInputs();
            document.getElementById(GAME_CONTROLLER_ELEMENTS.POPUP_MODAL_GAME_CONTROLLER)!.style.setProperty('display', 'none');
        });

        document.getElementById(GAME_CONTROLLER_ELEMENTS.SUBMIT_BLUFFS)!.addEventListener('click', e => {
            this.someButtonPressed = true;
            document.getElementById(GAME_CONTROLLER_ELEMENTS.POPUP_MODAL_GAME_CONTROLLER)!.style.setProperty('display', 'none');
            document.getElementById(GAME_CONTROLLER_ELEMENTS.PLAYER_CHANCE_MODAL)!.style.setProperty('display', 'none');
            this.extractSelectedCards();
            this.clearPopUpInputs();
        });
    }

    private clearPopUpInputs() {
        let bluffSelect = document.getElementById(GAME_CONTROLLER_ELEMENTS.POPUP_MODAL_GAME_CONTROLLER)!.querySelector('select')!;
        for (let i = 0; i < bluffSelect.options.length; i++) {
            bluffSelect.options[i].selected = false;
        }
    }

    private startOperations() {
        this.joiningCode = this.gameType.mode === GAME_TYPES.NEW_GAME_WITH_FRIENDS ? String(Date.now()) : this.gameType.data;
        this.connectToServer()
            .then(() => {
                switch(this.gameType.mode) {
                    case GAME_TYPES.NEW_GAME_WITH_FRIENDS:
                        let friendlyPlayer: IFriendlyPlayerProfile = {
                            playersAllowed: this.gameType.data,
                            joiningCode: this.joiningCode,
                            id: this.playerData.getId()!.toString(),
                            points: this.playerData.getPoints()!.toString(),
                            playerName: this.playerData.getPlayerName()!,
                            dpUrl: this.playerData.getDpURL()!
                        }
                        this.taskingSystem.createFriendlyPlatform(friendlyPlayer);
                    break;
                    case GAME_TYPES.JOIN_EXISTING_GAME:
                        let joiningFriendlyPlayer: IJoiningFriendlyPlayerProfile = {
                            joiningCode: this.joiningCode,
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

        // this.simulatingPlayersJoin();
    }

    private deselectAllCards() {
        document.getElementById(GAME_CONTROLLER_ELEMENTS.CARDS_SECTION)!.innerHTML = '';
        this.renderAllCards();
    }

    private renderAllCards() {
        let cardSectionElement = document.getElementById(GAME_CONTROLLER_ELEMENTS.CARDS_SECTION)!;

        Array.from(this.playerCardIndexes).forEach(value => {  
            let imgId = value + '-' + this.cardSet[value].split('/')[this.cardSet[value].split('/').length-1].replace('.png', '');
            cardSectionElement.appendChild(
                <a>
                    <img id={imgId} src={this.cardSet[value]} width="80" style="margin-left: -54px;"></img>
                </a>
            );

            let cardElement = document.getElementById(imgId)!;
            cardElement.addEventListener('click', event => {
                this.someButtonPressed = true;
                if (cardElement.style.getPropertyValue('border') === '3px solid green') {
                    cardElement.style.removeProperty('border');
                } else {
                    cardElement.style.setProperty('border', '3px solid green');
                }
            })
        })
    }

    private simulatingPlayersJoin() {
        this.playerCardIndexes = new Set();
        for (let i = 0; i < 5; i++) {
            this.playerCardIndexes.add(i);
        }
        setTimeout(() => {
            this.allPlayers = [
                new PlayerData({
                    "id": 107926860528192897024,
                    "playerName":"Yusuf Idrishi",
                    "dpUrl": "https://lh3.googleusercontent.com/a-/AOh14Ghcth4SDZ_804-a84YKyvZLjqJGCZATcHc16RJhewg=s96-c",
                    "points": 0
                } as any)
            ]
            for (let i = 0; i < 7; i++) {
                setTimeout(() => {
                    this.allPlayers.push(
                        new PlayerData({
                            "id": 101235449738558111744,
                            "playerName":"Mohammad Yusuf Idrishi",
                            "dpUrl": "https://lh3.googleusercontent.com/a/AATXAJzFS6Rd9-vzPlHTmlIqqvgqhAYV_TUkMZ_5p0ww=s96-c",
                            "points": 0
                        } as any)
                    )
                    this.renderPlayersList();
                }, (i+1)*500);
            }
            this.renderPlayersList();
        })

        setTimeout(() => {
            this.startRnderingGamePlay();
        }, 4500)
    }

    private connectToServer(): Promise<void> {
        let socket = new SockJS('http://localhost:8091/websocket-example');
        let stompClient = Stompjs.over(socket);
        return new Promise((resolve, reject) => {
            stompClient.connect({}, (frame: any) => {
                stompClient.subscribe('/topic/join-game/'+this.joiningCode, (data: any) => {
                    this.allPlayers = [];
                    JSON.parse(data.body).forEach((data: any) => {
                        this.allPlayers.push(new PlayerData(data));
                    })
                    this.renderPlayersList();
                });

                stompClient.subscribe('/topic/start-game/'+this.joiningCode, (data: any) => {
                    setTimeout(() => {
                        let gameStartData: any = JSON.parse(data.body).playerIdCard;
                        console.log('gamestart = ', gameStartData);
                        for (let key in gameStartData) {
                            console.log('trying = ', BigInt(key), this.playerData.getId()!);
                            if (BigInt(key) === this.playerData.getId()!) {
                                console.log('found = ', gameStartData[key]);
                                this.playerCardIndexes = new Set(gameStartData[key]);
                                break;
                            }
                        }
                        this.startRnderingGamePlay(); 
                    }, 1000);
                });

                stompClient.subscribe('/topic/player-chances/'+this.joiningCode, (chanceInfo: any) => {
                    // chanceInfo: Last chance info, whose cahnce is now and is someone won
                    this.activateTheChance();
                });
                resolve();
            });
        })
    }

    private activateTheChance() {
        document.getElementById(GAME_CONTROLLER_ELEMENTS.PLAYER_CHANCE_MODAL)!.style.setProperty('display', 'none');
    }

    private startRnderingGamePlay() {
        let element: HTMLElement = document.getElementById(GAME_CONTROLLER_ELEMENTS.GAME_PLAY_MODAL)!;
        element.innerHTML = '';
        let playersRenderList: HTMLElement[] = [];
        this.allPlayers.forEach(eachPlayer => {
            playersRenderList.push(
                <tr>
                    <td class="table-data">
                        <div>
                            <img style="border-radius: 17px; width: 17px; height: 17px;" src={eachPlayer.getDpURL()!.toString()}></img>
                            <div style="text-align: center;">
                                <div>{eachPlayer.getPlayerName()}</div>
                            </div>
                        </div>
                    </td>
                    <td style="text-align: left; width: 80%; font-size: 13px;" class="table-data">
                        <div>
                            HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO 
                        </div>
                    </td>
                </tr>
            )
        })
        element.appendChild(
            <div>
                <div style="text-align: right">
                    <button id={GAME_CONTROLLER_ELEMENTS.CLOSE_GAME_REQUEST} class="btn" style="background: #f34a4a; width: 61px; padding: 3px; margin: 7px;">QUIT</button>
                </div>
                <table style="font-size: 7px; width: 100%;">
                    {playersRenderList.map(a => a)}
                </table>
                <div id={GAME_CONTROLLER_ELEMENTS.CARDS_SECTION} class="card-container"></div>
                <div id={GAME_CONTROLLER_ELEMENTS.PLAYER_CHANCE_MODAL} style="width: 100%;">
                    <button id={GAME_CONTROLLER_ELEMENTS.SUBMIT_SELECTED_CARDS} class="btn" style="position: absolute; left: 10px; bottom: 28px; padding: 5px;">SUBMIT</button>
                    <button id={GAME_CONTROLLER_ELEMENTS.PASS_THE_CHANCE}  class="btn" style="position: absolute; transform: translate(-50%); bottom: 28px; padding: 5px;">PASS</button>
                    <button id={GAME_CONTROLLER_ELEMENTS.CALL_BLUFF}  class="btn" style="position: absolute; right: 10px; bottom: 28px; padding: 5px;">CALL BLUFF</button>
                </div>
            </div>
        )
        this.renderAllCards();

        document.getElementById(GAME_CONTROLLER_ELEMENTS.SUBMIT_SELECTED_CARDS)!.addEventListener('click', event => {
            this.someButtonPressed = true;
            this.openPopupBoxToChooseBluffs();
        })

        document.getElementById(GAME_CONTROLLER_ELEMENTS.PASS_THE_CHANCE)!.addEventListener('click', e => {
            this.someButtonPressed = true;
            document.getElementById(GAME_CONTROLLER_ELEMENTS.PLAYER_CHANCE_MODAL)!.style.setProperty('display', 'none');
        });

        document.getElementById(GAME_CONTROLLER_ELEMENTS.CALL_BLUFF)!.addEventListener('click', e => {
            this.someButtonPressed = true;
            document.getElementById(GAME_CONTROLLER_ELEMENTS.PLAYER_CHANCE_MODAL)!.style.setProperty('display', 'none');
        });

        document.getElementById(GAME_CONTROLLER_ELEMENTS.CLOSE_GAME_REQUEST)!.addEventListener('click', e => {
            this.someButtonPressed = true;
            document.getElementById(GAME_CONTROLLER_ELEMENTS.GAME_POPUP_MODAL)!.style.removeProperty('display');
        });

        document.getElementById(GAME_CONTROLLER_ELEMENTS.QUIT_CURRENT_GAME)!.addEventListener('click', e => {
            this.someButtonPressed = true;
            new LoginHandler(this.taskingSystem, APP_ELEMENTS.MAIN_AREA);
        });

        document.getElementById(GAME_CONTROLLER_ELEMENTS.DONT_QUIT_GAME)!.addEventListener('click', e => {
            this.someButtonPressed = true;
            document.getElementById(GAME_CONTROLLER_ELEMENTS.GAME_POPUP_MODAL)!.style.setProperty('display', 'none');
        });
    }

    private openPopupBoxToChooseBluffs() {
        let imgDiv = document.getElementById(GAME_CONTROLLER_ELEMENTS.CARDS_SECTION)!;
        let arrImgElements = imgDiv.querySelectorAll('img');
        let noOfCardsSelected = 0;
        for (let i = 0; i < arrImgElements.length; i++) {
            if (arrImgElements[i].style.getPropertyValue('border') === '3px solid green') {
                noOfCardsSelected++;
            }
        }
        if (noOfCardsSelected > 0) {
            document.getElementById(GAME_CONTROLLER_ELEMENTS.POPUP_MODAL_GAME_CONTROLLER)!.querySelector('h4')!.innerText = 'CHOOSE YOUR BLUFFS FOR '+noOfCardsSelected+' CARD(S)';
            document.getElementById(GAME_CONTROLLER_ELEMENTS.POPUP_MODAL_GAME_CONTROLLER)!.style.removeProperty('display');
        }
    }

    private extractSelectedCards() {
        let collectedBluffInputs: {[key: number]: number} = {};
        let bluffKey = 0;
        let bluffSelect = document.getElementById(GAME_CONTROLLER_ELEMENTS.POPUP_MODAL_GAME_CONTROLLER)!.querySelector('select')!;
        for (let i = 0; i < bluffSelect.options.length; i++) {
            if (bluffSelect.options[i].selected) {
                bluffKey = i;
                break;
            }
        }
        collectedBluffInputs[bluffKey] = 0;
        let selectedCards: {[key: number]: number} = {};
        let imgDiv = document.getElementById(GAME_CONTROLLER_ELEMENTS.CARDS_SECTION)!;
        let arrImgElements = imgDiv.querySelectorAll('img');
        for (let i = 0; i < arrImgElements.length; i++) {
            if (arrImgElements[i].style.getPropertyValue('border') === '3px solid green') {
                let cardIndex = Number(arrImgElements[i].id.split('-')[0]);
                this.playerCardIndexes.delete(cardIndex);
                let key = cardIndex%13+1;
                if (key in selectedCards) {
                    selectedCards[key]++;
                } else {
                    selectedCards[key] = 1;
                }
                collectedBluffInputs[bluffKey]++;
            }
        }
        imgDiv.innerHTML = '';
        console.log('[TODO] Need to send the data = ', selectedCards, collectedBluffInputs);
        this.renderAllCards();
        
        let playerResponse: IPlayerGameResponse = {
            playerId: this.playerData.getId()!.toString(),
            joiningCode: this.joiningCode,
            cards: selectedCards,
            bluffs: collectedBluffInputs,
            calledBluff: false,
            givenPass: false
        }
        this.taskingSystem.sendPlayerGameResponse(playerResponse);
    }

    private renderPlayersList() {
        let element: HTMLElement = document.getElementById(GAME_CONTROLLER_ELEMENTS.PLAYERS_LIST)!;
        element.innerHTML = '';

        let playersList: HTMLElement[] = [];
        this.allPlayers.filter(pd => pd.getId() !== this.playerData.getId()).forEach(playerData => {
            playersList.push(
                <div style="margin: 0px 0px 12px 0px;">
                    <img class="dp-image-list" style="float: left; margin: 0px 11px 0px 0px;" src={playerData.getDpURL()!.toString()}></img>
                    <div style="text-align: left;">
                        <div>{playerData.getPlayerName()}</div>
                        <span>{playerData.getPoints()} Points</span>
                    </div>
                </div>
            )
        })

        element.appendChild(
            <div style=" position: absolute; top: 27%; width: 315px; left: 50%; margin: 0px 0px 0px -160px;">
                <div>Please wait while players are joining...</div>
                <div style="text-align: left; margin: 14px 0px 0px 7px;">
                    <div style="margin: 0px 0px 10px 0px;">Players joined till now:</div>
                    {playersList.map(a => a)}
                </div>
            </div>
        )
    }

    private loadUIComponent() {
        let element: HTMLElement = document.getElementById(APP_ELEMENTS.MAIN_AREA)!;
        element.innerHTML = '';

        let cards = [];
        for (let i = 1; i <= 13; i++) {
            switch (i) {
                case 1:
                    cards.push(<option value={i}>Ace</option>);
                break;
                case 11:
                    cards.push(<option value={i}>Jack</option>);
                break;
                case 12:
                    cards.push(<option value={i}>Queen</option>);
                break;
                case 13:
                    cards.push(<option value={i}>King</option>);
                break;    
                default:
                    cards.push(<option value={i}>{i}</option>);
                break;
            }
        }

        let view = (
            <div class="mid-target bg-design-game-controller">
                <div id={GAME_CONTROLLER_ELEMENTS.GAME_PLAY_MODAL} style="width: 100%; height: 93%;">
                    <span class="loader-container">
                        <div class="loader"></div>
                    </span>
                    <div id={GAME_CONTROLLER_ELEMENTS.PLAYERS_LIST}></div>
                </div>
                <div id={GAME_CONTROLLER_ELEMENTS.POPUP_MODAL_GAME_CONTROLLER} class="game-modal mid-target" style="display: none;">
                    <div class="game-submit-modal">
                        <i id={GAME_CONTROLLER_ELEMENTS.CLOSE_GAME_POPUP_MODAL} class="fa fa-times cross-button btn" style="top: 150px; right: 15px;" aria-hidden="true"></i>
                        <h4 style="color: white; margin: 0px; padding: 39px 0px 5px 0px;"></h4>
                        <div style="height: 69%;">
                            <div class="game-model-area-first">
                                <div class="code-area">
                                    <span class="code-label float-left">CHOOSE A CARD TYPE</span>
                                </div>
                                <select class="code-input">
                                    {cards.map(a => a)}
                                </select>
                            </div>
                        </div>
                        <button class="btn" style="margin: 14px; padding: 5px;" id={GAME_CONTROLLER_ELEMENTS.SUBMIT_BLUFFS}>SUBMIT YOUR CARDS AND BLUFFS</button>
                    </div>
                </div>
                <div id={GAME_CONTROLLER_ELEMENTS.GAME_POPUP_MODAL} style="width: 100%; height: 100%; position: absolute; z-index: 1; top: 0px; left: 0px; background-color: rgba(128, 128, 128, 0.44); display: none;">
                    <div class="game-modal-popup-open mid-target">
                        <div>
                            <h4 style="color: white; margin: 110px 0px 24px 0px;">ARE YOU SURE?</h4>
                            <button id={GAME_CONTROLLER_ELEMENTS.QUIT_CURRENT_GAME} class="btn" style="margin: 0px 40px 0px 0px;">YES</button>
                            <button id={GAME_CONTROLLER_ELEMENTS.DONT_QUIT_GAME} class="btn" style="margin: 0px 0px 0px 40px;">NO</button>
                        </div>
                    </div>
                </div>
                <small class="footer">A game by IntellectI</small>
            </div>
        );
        element.appendChild(view);
    }

}

enum GAME_CONTROLLER_ELEMENTS {
    PLAYERS_LIST = 'players-list',
    GAME_PLAY_MODAL = 'game-play-modal',
    CARDS_SECTION = 'cards-section',
    SUBMIT_SELECTED_CARDS = 'submit-selected-cards',
    CALL_BLUFF = 'call-bluff',
    POPUP_MODAL_GAME_CONTROLLER = 'popup-modal-game-control',
    CLOSE_GAME_POPUP_MODAL = 'clos-game-popup-modal',
    SUBMIT_BLUFFS = 'submit-bluffs',
    PASS_THE_CHANCE = 'pass-the-chance',
    PLAYER_CHANCE_MODAL = 'player-chance-modal',
    CLOSE_GAME_REQUEST = 'close-game-request',
    GAME_POPUP_MODAL = 'game-popup-modal',
    QUIT_CURRENT_GAME = 'quit-current-game',
    DONT_QUIT_GAME = 'dont-quit-game'
}
/**
 * Necessary imports of the packages
 */
import { UserLoginData } from '../../services/model/taskdata';
import { PlayerData } from '../../services/model/playerdata';
import { TaskingSystem } from '../../services/taskingsystem/taskingsystem';
import { MyOwnTSX } from '../../services/utils/myowntsx';
import { SystemHandler } from '../systemhandler/systemhandler';
import { ObjectId } from 'bson';

export class LoginHandler {

    constructor(taskingSystem: TaskingSystem, divName: string) {
        this.start(taskingSystem, divName);
    }

    private start(taskingSystem: TaskingSystem, divName: string) {
        this.loadUIComponent(divName);
        taskingSystem.isAlreadyLoggedIn().then(answer => {
            if (answer) {
                taskingSystem.getUpstreamInstance()
                    .fetchUserDataFromUpstream(String(answer.getId()))
                    .then(playerData => {
                        document.getElementById(LOGIN_HANDLER.CONTENT_CHANGE_AREA)!.innerHTML = '';
                        new SystemHandler(playerData, LOGIN_HANDLER.CONTENT_CHANGE_AREA);
                    })
            } else {
                document.getElementById(LOGIN_HANDLER.GOOGLE_SIGNIN)!.style.removeProperty('display');
                this.listenToUserLogin(taskingSystem);
            }
        });
    }

    private loadUIComponent(divName: string) {
        let element: HTMLElement = document.getElementById(divName)!;
        let view = (
            <div class="mid-target bg-design">
                <h1 class="main-heading">BLUFF</h1>
                <div id={LOGIN_HANDLER.CONTENT_CHANGE_AREA}>
                    <div id={LOGIN_HANDLER.GOOGLE_SIGNIN} class="mid-target" style="display: none;"></div>
                </div>
                <small class="footer">A game by IntellectI</small>
            </div>
        );
        element.appendChild(view);
    }

    /**
     * @private
     * @function listenToUserId waits for the user to login and then get their details
     */
     private listenToUserLogin(taskingSystem: TaskingSystem) {
        document.getElementById(LOGIN_HANDLER.LOGIN_DATA_CONTAINER)!.addEventListener('click', e => {
            this.startMainSystem(taskingSystem);
        });
        this.startMainSystem(taskingSystem);
    }

    private startMainSystem(taskingSystem: TaskingSystem) {
        let rawLoginData = document.getElementById(LOGIN_HANDLER.LOGIN_DATA_CONTAINER)!.innerHTML;
        if (rawLoginData) {
            let loginData: UserLoginData = JSON.parse(rawLoginData);
            let playerData = new PlayerData(
                {
                    id: loginData.id,
                    playerName: loginData.name, 
                    points: '0',
                    dpUrl: new URL(loginData.dpImageUrl)
                }
            );
            taskingSystem.saveUserData(playerData);
            document.getElementById(LOGIN_HANDLER.CONTENT_CHANGE_AREA)!.innerHTML = '';
            new SystemHandler(playerData, LOGIN_HANDLER.CONTENT_CHANGE_AREA);
        }
    }
}



enum LOGIN_HANDLER {
    LOGIN_DATA_CONTAINER = 'login-data-container',
    GOOGLE_SIGNIN = 'my-signin2',
    CONTENT_CHANGE_AREA = 'content-change-area'
}
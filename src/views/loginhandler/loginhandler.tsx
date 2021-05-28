/**
 * Necessary imports of the packages
 */
import * as React from 'react';
import { UserLoginData } from '../../services/model/logindata';
import { UserData } from '../../services/model/userdata';
import { TaskingSystem } from '../../services/taskingsystem/taskingsystem';
import { MyOwnTSX } from '../../services/utils/myowntsx';

export class LoginHandler {

    constructor(taskingSystem: TaskingSystem, divName: string) {
        this.start(taskingSystem, divName);
    }

    private start(taskingSystem: TaskingSystem, divName: string) {
        taskingSystem.isLogingNeeded().then(answer => {
            if (answer) {
                this.loadUIComponent(divName);
                this.listenToUserLogin(taskingSystem);
            } else {
                let userData = taskingSystem.fetchUserDataFromUpstream();
            }
        });
    }

    private loadUIComponent(divName: string) {
        let doc: HTMLElement = document.getElementById(divName)!;
        let view = (
            <div className="mid-target bg-design">
                <h1 style={{fontSize: "435%", textShadow: "2px 2px 4px", color: "white"}}>BLUFF</h1>
                <div id="my-signin2" className="mid-target" style={{boxShadow: "2px 2px 4px white"}}></div>
            </div>
        );
        MyOwnTSX.renderUI(view, doc);
    }

    /**
     * @private
     * @function listenToUserId waits for the user to login and then get their details
     */
     private listenToUserLogin(taskingSystem: TaskingSystem) {
        document.getElementById(LOGIN_HANDLER.LOGIN_DATA_CONTAINER)!.addEventListener('click', e => {
            let loginData: UserLoginData = JSON.parse((e.target as HTMLSpanElement).innerHTML);
            let userData = new UserData(
                {
                    userId: loginData.id, 
                    points: 0
                }
            );
            taskingSystem.saveUserData(userData);
        });
    }
}



enum LOGIN_HANDLER {
    LOGIN_DATA_CONTAINER = 'login-data-container'
}
/**
 * @file This File house the EntryPoint of this application viz, App
 */

/**
 * Necessary imports of the packages
 */
import { LoginHandler } from '../../views/loginhandler/loginhandler';
import { TaskingSystem } from '../taskingsystem/taskingsystem';

/**
 * @class Executes at the begining of the app  
 */
export class App {
    /**
     * @constructor Initiate the application to start
     */
    constructor () {
        this.start();
    }

    /**
     * @private 
     * @function start Start the activity
     */
    private start() {
        let taskingSystem = new TaskingSystem();
        new LoginHandler(taskingSystem, APP_ELEMENTS.MAIN_AREA);
    }
}

/**
 * @enum Contains the html page elements used in starting of application
 */
export enum APP_ELEMENTS {
    MAIN_AREA = 'main-area'
}

/**
 * Initialization of the class App and starting the application
 */
new App();

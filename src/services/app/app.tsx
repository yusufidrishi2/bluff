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

    private static taskingSystem: TaskingSystem = null as any;

    /**
     * @constructor Initiate the application to start
     */
    private constructor () {
    }

    /**
     * @private 
     * @function start Start the activity
     */
    static start() {
        this.taskingSystem = new TaskingSystem();
        new LoginHandler(this.taskingSystem, APP_ELEMENTS.MAIN_AREA);
    }

    static getTaskingSystem() {
        return this.taskingSystem;
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
App.start();

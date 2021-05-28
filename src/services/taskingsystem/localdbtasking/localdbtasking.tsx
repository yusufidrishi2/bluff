import { IUserData } from "../../model/userdata";

export class LocalDBTasking {

    constructor() {
    }

    fetchDataFromLocalDB(): Promise<number|null> {
        throw Error("Subclass of LocalDBTasking class must implement fetchDataFromLocalDB function");
    }

    saveUserDataToLocalDB(serialisedUserData: IUserData): Promise<any> {
        throw Error("Subclass of LocalDBTasking class must implement saveUserDataToLocalDB function");
    }
}
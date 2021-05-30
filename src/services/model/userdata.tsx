export class UserData {
    
    private _id: number|null;
    
    private _points: number|null;

    private _name: string|null;

    private _dpUrl: URL|null

    constructor(userData: IUserData|null = null) {
        this._id = null;
        this._points = null;
        this._name = null;
        this._dpUrl = null;
        
        if (userData) {
            this.deSerialisedData(userData);    
        }
    }

    setId(id: number|null) {
        this._id = id;
    }

    getId(): number|null {
        return this._id;
    }

    setPoints(points: number|null) {
        this._points = points;
    }

    getPoints(): number|null {
        return this._points;
    }

    setName(name: string|null) {
        this._name = name;
    }

    getName(): string|null {
        return this._name;
    }

    setDpURL(dpURL: URL|null) {
        this._dpUrl = dpURL;
    }

    getDpURL(): URL|null {
        return this._dpUrl;
    }

    getSerialisedData(): IUserData {
        return {
            id: this._id!,
            points: this._points!,
            name: this._name!,
            dpUrl: this._dpUrl!
        }
    }

    deSerialisedData(userData: IUserData) {
        this._id = userData.id;
        this._points = userData.points;
        this._name = userData.name;
        this._dpUrl = userData.dpUrl;
    }
}

export interface IUserData {
    id: number,
    points: number,
    name: string,
    dpUrl: URL
}
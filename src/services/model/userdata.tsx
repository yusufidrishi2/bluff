export class UserData {
    
    private _userId: number|null;
    
    private _points: number|null;

    constructor(userData: IUserData|null = null) {
        this._userId = null;
        this._points = null;
        
        if (userData) {
            this.deSerialisedData(userData);    
        }
    }

    setUserId(userId: number|null) {
        this._userId = userId;
    }

    getUserId(): number|null {
        return this._userId;
    }

    setPoints(points: number|null) {
        this._points = points;
    }

    getPoints(): number|null {
        return this._points;
    }

    getSerialisedData(): IUserData {
        return {
            userId: this._userId!,
            points: this._points!
        }
    }

    deSerialisedData(userData: IUserData) {
        this._userId = userData.userId;
        this._points = userData.points;
    }
}

export interface IUserData {
    userId: number,
    points: number
}
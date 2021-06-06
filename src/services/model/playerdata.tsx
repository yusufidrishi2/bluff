
export class PlayerData {
    
    private id: bigint|null;
    
    private _points: bigint|null;

    private _playerName: string|null;

    private _dpUrl: URL|null;

    constructor(playerData: IPlayerData|null = null) {
        this.id = null;
        this._points = null;
        this._playerName = null;
        this._dpUrl = null;
        
        if (playerData) {
            this.deSerialisedData(playerData);    
        }
    }

    setId(id: bigint|null) {
        this.id = id;
    }

    getId(): bigint|null {
        return this.id;
    }

    setPoints(points: bigint|null) {
        this._points = points;
    }

    getPoints(): bigint|null {
        return this._points;
    }

    setPlayerName(name: string|null) {
        this._playerName = name;
    }

    getPlayerName(): string|null {
        return this._playerName;
    }

    setDpURL(dpURL: URL|null) {
        this._dpUrl = dpURL;
    }

    getDpURL(): URL|null {
        return this._dpUrl;
    }

    getSerialisedData(): IPlayerData {
        return {
            id: this.id!.toString(),
            points: this._points!.toString(),
            playerName: this._playerName!,
            dpUrl: this._dpUrl!
        }
    }

    deSerialisedData(playerData: IPlayerData) {
        this.id = BigInt(playerData.id);
        this._points = BigInt(playerData.points);
        this._playerName = playerData.playerName;
        this._dpUrl = playerData.dpUrl;
    }
}

export interface IPlayerData {
    id: string,
    points: string,
    playerName: string,
    dpUrl: URL
}
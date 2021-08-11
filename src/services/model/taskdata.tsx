export interface UserLoginData {
    id: string;
    name: string;
    dpImageUrl: string;
    email: string;
}

export interface UserInputData {
    mode: GAME_TYPES;
    data: any;
}

export enum GAME_TYPES {
    NEW_GAME_WITH_FRIENDS,
    GAME_WITH_RANDOM,
    JOIN_EXISTING_GAME
}

export interface IFriendlyPlayerProfile {
    playersAllowed: number;
    joiningCode: string;
    id: string;
    points: string;
    playerName: string;
    dpUrl: URL;
}

export interface IJoiningFriendlyPlayerProfile {
    joiningCode: string;
    id: string;
    points: string;
    playerName: string;
    dpUrl: URL;
}

export enum NotificationType {
    FAILURE,
    SUCCESS
}

export interface ServerNotification {
    notificationType: NotificationType;
    message: string;
}

export interface IPlayerGameResponse {
    playerId: string;
    joiningCode: string;
    cards: {[key: number]: number};
    bluffs: {[key: number]: number};
    calledBluff: boolean,
    givenPass: boolean
}
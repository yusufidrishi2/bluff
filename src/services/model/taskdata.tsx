export interface UserLoginData {
    id: string,
    name: string,
    dpImageUrl: string,
    email: string
}

export interface UserInputData {
    mode: GAME_TYPES,
    data: any
}

export enum GAME_TYPES {
    NEW_GAME_WITH_FRIENDS,
    GAME_WITH_RANDOM,
    JOIN_EXISTING_GAME
}
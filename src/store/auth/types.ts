export enum AuthActions {
    AUTH_START = '@@auth/AUTH_START',
    AUTH_ERROR = '@@auth/AUTH_ERROR',
    AUTH_SUCCESS = '@@auth/AUTH_SUCCESS',
    AUTH_CHANGE_USERNAME = '@@auth/AUTH_CHANGE_USERNAME',
    AUTH_CHANGE_PASSWORD = '@@auth/AUTH_CHANGE_PASSWORD',
    SET_AUTHENTICATED = '@@auth/SET_AUTHENTICATED',
    LOG_OUT = '@@auth/LOG_OUT',
}

export interface LogInForm {
    username: string;
    password: string;
}

export interface ErrorMessage {
    password: string;
    username: string;
}

export interface AuthState {
    readonly authenticated: boolean;
    readonly authStart: boolean;
    readonly username: string;
    readonly password: string;
    readonly error: ErrorMessage;
    readonly loginUser: string;
}
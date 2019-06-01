export enum AuthActions {
    AUTH_START = '@@auth/AUTH_START',
    AUTH_ERROR = '@@auth/AUTH_ERROR',
    AUTH_SUCCESS = '@@auth/AUTH_SUCCESS',
}

export interface LogInForm {
    username: string;
    password: string;
}

export interface AuthState {
    readonly authStart: boolean;
}
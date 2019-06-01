import { AuthState, AuthActions } from './types';
import { Reducer } from 'redux'

export const initialState: AuthState = {
    authStart: false,
    authenticated: false,
    username: '',
    password: '',
    loginUser: '',
    error: {
        password: '',
        username: '',
    }
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthActions.AUTH_START: {
            return { ...state, authStart: true, }
        }
        case AuthActions.AUTH_SUCCESS: {
            return {
                ...state,
                authStart: false,
                authenticated: true,
                error: { password: '', username: '' },
                loginUser: action.payload,
                username: '',
                password: '',
            }
        }
        case AuthActions.AUTH_ERROR: {
            return { ...state, authStart: false, error: action.payload }
        }
        case AuthActions.LOG_OUT: {
            return { ...state, authenticated: false }
        }
        case AuthActions.AUTH_CHANGE_USERNAME: {
            return { ...state, username: action.payload }
        }
        case AuthActions.AUTH_CHANGE_PASSWORD: {
            return { ...state, password: action.payload }
        }
        case AuthActions.SET_AUTHENTICATED: {
            return { ...state, authenticated: action.payload }
        }
        default: {
            return state
        }
    }
}

export { reducer as authReducer }
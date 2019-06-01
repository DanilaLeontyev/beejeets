import { AuthState, AuthActions } from './types';
import { Reducer } from 'redux'

export const initialState: AuthState = {
    authStart: false,
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthActions.AUTH_START: {
            return { ...state, authStart: true }
        }
        case AuthActions.AUTH_SUCCESS: {
            return { ...state, authStart: false }
        }
        case AuthActions.AUTH_ERROR: {
            return { ...state, authStart: false }
        }
        default: {
            return state
        }
    }
}

export { reducer as authReducer }
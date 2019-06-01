import { CustomThunkDispatch } from '../../types/ThunkDispatch';
import { action } from 'typesafe-actions';
import { LogInForm, AuthActions, ErrorMessage } from './types';

const getLogInAPI = (username: string, password: string): string => {
    return `https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=danila
    &username=${username}&password=${password}`
}

export function logIn(formField: LogInForm) {
    return async (dispatch: CustomThunkDispatch) => {
        let form = new FormData();
        form.append("username", formField.username);
        form.append("password", formField.password);
        fetch(getLogInAPI(formField.username, formField.password),
            { method: 'POST', body: form })
            .then(res => res.json().then(body => {
                console.log(body);
                if (body.status !== 'error') {
                    dispatch(authSuccess('admin'));
                    dispatch(setAuthenticated(true));
                    window.localStorage.setItem('token', body.message.token);
                    window.localStorage.setItem('time', String(new Date().getTime() + 60 * 60 * 24 * 1000));
                } else {
                    dispatch(authError(body.message))
                    dispatch(setAuthenticated(false))
                }
            }))
    }
}

export function logOut() {
    return async (dispatch: CustomThunkDispatch) => {
        window.localStorage.removeItem('time')
        window.localStorage.removeItem('token')
        dispatch(setLogOut())
    }
}

export const authStart = () => action(AuthActions.AUTH_START)
export const authError = (message: ErrorMessage) => action(AuthActions.AUTH_ERROR, message)
export const authSuccess = (username: string) => action(AuthActions.AUTH_SUCCESS, username)
export const authChangeUsername = (username: string) => action(AuthActions.AUTH_CHANGE_USERNAME, username)
export const authChangePassword = (password: string) => action(AuthActions.AUTH_CHANGE_PASSWORD, password)
export const setAuthenticated = (authenticated: boolean) => action(AuthActions.SET_AUTHENTICATED, authenticated)
export const setLogOut = () => action(AuthActions.LOG_OUT)

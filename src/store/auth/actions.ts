import { CustomThunkDispatch } from '../../types/ThunkDispatch';
import { action } from 'typesafe-actions';
import { LogInForm, AuthActions } from './types';

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
                console.log(body)
            }))
    }
}

export const authStart = () => action(AuthActions.AUTH_START)
export const authError = (message: string) => action(AuthActions.AUTH_ERROR, message)
export const authSuccess = (token: string) => action(AuthActions.AUTH_SUCCESS, token)

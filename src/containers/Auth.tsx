import React from 'react';
import { connect } from 'react-redux';
import { CustomThunkDispatch } from '../types/ThunkDispatch';
import { ApplicationState } from '../store';
import { AuthState, LogInForm } from '../store/auth/types';
import { logIn, authChangeUsername, authChangePassword, setAuthenticated, logOut } from '../store/auth/actions';

interface AuthActions {
    logIn: (form: LogInForm) => void;
    authChangeUsername: (username: string) => void;
    authChangePassword: (password: string) => void;
    setAuthenticated: (authenticated: boolean) => void;
    logOut: () => void;
}

interface AuthProps {
    auth: AuthState;
    actions: AuthActions;
}

class Auth extends React.Component<AuthProps> {
    componentWillMount() {
        let time = Number(window.localStorage.getItem('time'));
        let now = new Date().getTime();
        if (time < now) {
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('time')
            this.props.actions.setAuthenticated(false);
        } else {
            this.props.actions.setAuthenticated(true);
        };
    }

    onLogIn = () => {
        const { username, password } = this.props.auth;
        this.props.actions.logIn({ username: username, password: password })
    }
    onLogOut = () => {
        this.props.actions.logOut();
    }

    onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.actions.authChangeUsername(e.target.value)
    }

    onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.actions.authChangePassword(e.target.value)
    }

    render() {
        const { username, password, error, authenticated } = this.props.auth;
        return (
            <div>
                {!authenticated &&
                    <div>
                        <button onClick={this.onLogIn}>Вход</button> <br />
                        <input type='text'
                            placeholder='Логин пользователя'
                            value={username}
                            onChange={this.onChangeUsername}
                            style={error.username ? { borderColor: 'red' } : { borderColor: 'black' }} />
                        <input type='password'
                            placeholder='Пароль'
                            value={password}
                            onChange={this.onChangePassword}
                            style={error.password ? { borderColor: 'red' } : { borderColor: 'black' }} />
                    </div>
                }
                {authenticated && <button onClick={this.onLogOut}>Выход</button>}
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    auth: state.auth,
})

const mapDispatchToProps = (dispatch: CustomThunkDispatch): { actions: AuthActions } => {
    return ({
        actions: {
            logIn: (form: LogInForm) => dispatch(logIn(form)),
            logOut: () => dispatch(logOut()),
            authChangeUsername: (username: string) => dispatch(authChangeUsername(username)),
            authChangePassword: (password: string) => dispatch(authChangePassword(password)),
            setAuthenticated: (authenticated: boolean) => dispatch(setAuthenticated(authenticated)),
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
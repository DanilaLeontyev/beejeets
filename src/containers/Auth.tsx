import React from 'react';
import { connect } from 'react-redux';
import { CustomThunkDispatch } from '../types/ThunkDispatch';
import { ApplicationState } from '../store';
import { AuthState, LogInForm } from '../store/auth/types';
import { logIn, authChangeUsername, authChangePassword, setAuthenticated, logOut } from '../store/auth/actions';
import AuthForm from '../components/AuthForm/AuthForm';

interface AuthActions {
    logIn: (form: LogInForm) => void;
    logOut: () => void;
    authChangeUsername: (username: string) => void;
    authChangePassword: (password: string) => void;
    setAuthenticated: (authenticated: boolean) => void;
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
            <AuthForm
                username={username}
                password={password}
                error={error}
                authenticated={authenticated}
                onLogIn={this.onLogIn}
                onLogOut={this.onLogOut}
                onChangeUserName={this.onChangeUsername}
                onChangePassword={this.onChangePassword}
            />
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
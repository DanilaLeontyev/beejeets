import React from 'react';
import { connect } from 'react-redux';
import { CustomThunkDispatch } from '../types/ThunkDispatch';
import { ApplicationState } from '../store';
import { AuthState, LogInForm } from '../store/auth/types';
import { logIn } from '../store/auth/actions';

interface AuthActions {
    logIn: (form: LogInForm) => void;
}

interface AuthProps {
    auth: AuthState;
    actions: AuthActions;
}

class Auth extends React.Component<AuthProps> {
    onLogIn = () => {
        this.props.actions.logIn({ username: 'admin', password: '123asdf' })
    }
    render() {
        return (
            <div>
                <button onClick={this.onLogIn}>Вход</button> <br />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    task: state.task,
})

const mapDispatchToProps = (dispatch: CustomThunkDispatch): { actions: AuthActions } => {
    return ({
        actions: {
            logIn: (form: LogInForm) => dispatch(logIn(form)),
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
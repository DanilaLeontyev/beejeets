import React from 'react';
import { ErrorMessage } from '../../store/auth/types';

interface AuthFormProps {
    username: string,
    password: string;
    error: ErrorMessage;
    authenticated: boolean;
    onLogIn: () => void;
    onLogOut: () => void;
    onChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {
    const { username,
        password,
        error,
        authenticated,
        onLogIn,
        onLogOut,
        onChangePassword,
        onChangeUserName } = props;

    return (
        <div>
            {!authenticated &&
                <div>
                    <button onClick={onLogIn}>Вход</button> <br />
                    <input type='text'
                        placeholder='Логин пользователя'
                        value={username}
                        onChange={onChangeUserName}
                        style={error.username ? { borderColor: 'red' } : { borderColor: 'black' }} />
                    <input type='password'
                        placeholder='Пароль'
                        value={password}
                        onChange={onChangePassword}
                        style={error.password ? { borderColor: 'red' } : { borderColor: 'black' }} />
                </div>
            }
            {authenticated && <button onClick={onLogOut}>Выход</button>}
        </div>
    )
}

export default AuthForm;
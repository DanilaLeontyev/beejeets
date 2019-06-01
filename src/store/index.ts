import { AuthState } from './auth/types';
import { combineReducers } from 'redux';
import { taskReducer } from "./task/reducer";
import { TaskState } from './task/types';
import { authReducer } from './auth/reducer';

export interface ApplicationState {
    task: TaskState;
    auth: AuthState;
}

export const createRootReducer = () =>
    combineReducers({
        task: taskReducer,
        auth: authReducer,
    })

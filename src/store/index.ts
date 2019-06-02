import { AddTaskState } from './addTask/types';
import { AuthState } from './auth/types';
import { TaskState } from './task/types';
import { combineReducers } from 'redux';
import { taskReducer } from "./task/reducer";
import { authReducer } from './auth/reducer';
import { addTaskReducer } from './addTask/reducer';

export interface ApplicationState {
    task: TaskState;
    auth: AuthState;
    addTask: AddTaskState;
}

export const createRootReducer = () =>
    combineReducers({
        task: taskReducer,
        auth: authReducer,
        addTask: addTaskReducer
    })

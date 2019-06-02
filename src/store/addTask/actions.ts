import { AddTaskForm } from './types';
import { CustomThunkDispatch } from './../../types/ThunkDispatch';
import { action } from 'typesafe-actions';
import { AddTaskActions } from './types'

const getCreateTaskApi = () => {
    return 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=danila';
}

export function createTask(formField: AddTaskForm) {
    return async (dispatch: CustomThunkDispatch, getState: () => void) => {
        let form = new FormData();
        form.append('username', formField.username);
        form.append('email', formField.email);
        form.append('text', formField.text);
        fetch(getCreateTaskApi(), { method: 'POST', body: form }).then(res => console.log(res))
    }
}

export const fetchTaskStart = () => action(AddTaskActions.FETCH_TASK_START)
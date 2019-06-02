import { AddTaskForm } from './types';
import { CustomThunkDispatch } from './../../types/ThunkDispatch';
import { action } from 'typesafe-actions';
import { AddTaskActions } from './types'
import { fetchTask } from '../task/actions';

const getCreateTaskApi = () => {
    return 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=danila';
}

export function createTask(formField: AddTaskForm) {
    return async (dispatch: CustomThunkDispatch, getState: () => void) => {
        let form = new FormData();
        form.append('username', formField.username);
        form.append('email', formField.email);
        form.append('text', formField.text);
        fetch(getCreateTaskApi(), { method: 'POST', body: form })
            .then(res => res.json().then(body => {
                if (body.status === 'ok') {
                    alert('Задача успешно добавлена')
                    dispatch(addTaskSucces());
                    dispatch(fetchTask());
                } else alert('Задача не добавлена')
            }))
    }
}

export const addTaskSucces = () => action(AddTaskActions.ADD_TASK_SUCCESS)
export const addTaskError = () => action(AddTaskActions.ADD_TASK_SUCCESS)
export const editUsername = (value: string) => action(AddTaskActions.EDIT_USERNAME, value)
export const editEmail = (value: string) => action(AddTaskActions.EDIT_EMAIL, value)
export const editText = (value: string) => action(AddTaskActions.EDIT_TEXT, value)
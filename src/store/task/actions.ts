import { ApplicationState } from './../index';
import { CustomThunkDispatch } from './../../types/ThunkDispatch';
import { action } from 'typesafe-actions'
import { TaskActions, Task, TaskSort, EditTask } from './types'

const getTaskAPI = (sortField: string, sortDirection: string, page: number): string => {
    return `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=danila
    &sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`
}

const editTaskAPI = (taskId: number): string => {
    return `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${taskId}?developer=danila`
}

export function fetchTask() {
    return async (dispatch: CustomThunkDispatch, getState: () => ApplicationState) => {
        const state = getState();
        const { sortField, sortDirection } = state.task.taskSort
        const { page } = state.task
        dispatch(fetchTaskStart());
        fetch(getTaskAPI(
            sortField,
            sortDirection,
            page))
            .then((res) => {
                res.json().then(body => {
                    if (body.status !== 'ok') {
                        dispatch(fetchTaskError(body.message))
                    } else {
                        dispatch(fetchTaskSuccess(body.message))
                    }
                })
            })
    }
}

export function changePage(pageNumber: number) {
    return async (dispatch: CustomThunkDispatch) => {
        await dispatch(setPage(pageNumber));
        dispatch(fetchTask())
    }
}

export function changeSorting(sort: TaskSort) {
    return async (dispatch: CustomThunkDispatch) => {
        await dispatch(setSorting(sort));
        dispatch(fetchTask())
    }
}

export function editTask(formField: EditTask) {
    return async (dispatch: CustomThunkDispatch) => {
        let form = new FormData();
        let token = window.localStorage.getItem('token')
        form.append('token', token ? token : '');
        form.append('text', formField.text);
        form.append('status', String(formField.status));
        fetch(editTaskAPI(formField.id), { method: 'POST', body: form })
            .then(res =>
                res.json().then(body => {
                    dispatch(fetchTask())
                    console.log(body)
                })
            )
    }
}

export const fetchTaskStart = () => action(TaskActions.FETCH_TASK_START)
export const fetchTaskSuccess = (tasks: { tasks: Task[], total_task_counte: number }) =>
    action(TaskActions.FETCH_TASK_SUCCESS, tasks)
export const fetchTaskError = (message: string) => action(TaskActions.FETCH_TASK_ERROR, message)
export const setPage = (pageNumber: number) => action(TaskActions.SET_PAGE, pageNumber)
export const setSorting = (sort: TaskSort) => action(TaskActions.SET_SORT, sort)
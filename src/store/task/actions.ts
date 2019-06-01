import { CustomThunkDispatch } from './../../types/ThunkDispatch';
import { action } from 'typesafe-actions'
import { TaskActions, Task, TaskSort, AddTask, EditTask } from './types'

const getCreateTaskApi = () => {
    return 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=danila';
}

const getTaskAPI = (sortField: string, sortDirection: string, page: number): string => {
    return `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=danila
    &sortfield=${sortField}&sort_direction=${sortDirection}&page=${page}`
}

const editTaskAPI = (taskId: number): string => {
    return `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${taskId}?developer=danila`
}

export function fetchTask(sort?: TaskSort, pageNumber?: number) {
    return async (dispatch: CustomThunkDispatch) => {
        dispatch(fetchTaskStart());
        fetch(getTaskAPI(
            sort ? sort.sortField : 'id',
            sort ? sort.sortDirection : 'desc',
            pageNumber ? pageNumber : 1))
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

export function addTask(formField: AddTask) {
    return async (dispatch: CustomThunkDispatch) => {
        let form = new FormData();
        form.append('username', formField.username);
        form.append('email', formField.email);
        form.append('text', formField.text);
        fetch(getCreateTaskApi(), { method: 'POST', body: form }).then(res => console.log(res))
        dispatch(fetchTask())
    }
}

export function changePage(pageNumber: number) {
    return async (dispatch: CustomThunkDispatch) => {
        dispatch(setPage(pageNumber));
        dispatch(fetchTask(undefined, pageNumber))
    }
}

export function changeSorting(sort: TaskSort) {
    return async (dispatch: CustomThunkDispatch) => {
        dispatch(setSorting(sort));
        dispatch(fetchTask(sort))
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
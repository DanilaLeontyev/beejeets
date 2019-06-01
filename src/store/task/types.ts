export interface Task {
    id: number;
    username: string;
    email: string;
    text: string;
    status: 0 | 10;
}

export enum TaskActions {
    FETCH_TASK_START = '@@task/FETCH_TASK_START',
    FETCH_TASK_SUCCESS = '@@task/FETCH_TASK_SUCCESS',
    FETCH_TASK_ERROR = '@@task/FETCH_TASK_ERROR',
    SET_PAGE = '@@task/SET_PAGE',
    SET_SORT = '@@task/SET_SORT'
}

export interface AddTask {
    username: string;
    text: string;
    email: string;
}

export interface EditTask {
    id: number;
    text: string;
    status: 0 | 10;
}

export type SortField = 'id' | 'username' | 'email' | 'status'
export type SortDirection = 'asc' | 'desc'

export interface TaskSort {
    sortField: SortField;
    sortDirection: SortDirection;
}

export interface TaskState {
    readonly tasks: Task[];
    readonly totalTaskCount: number;
    readonly errorLoading: boolean;
    readonly errorMessage: string;
    readonly tasksLoading: boolean;
    readonly page: number;
    readonly taskSort: TaskSort;
}
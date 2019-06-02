export enum AddTaskActions {
    FETCH_TASK_START = '@@task/FETCH_TASK_START',
}

export interface AddTaskForm {
    username: string;
    text: string;
    email: string;
}

export interface AddTaskState {
    readonly username: string;
    readonly text: string;
    readonly email: string;
}
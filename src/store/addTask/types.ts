export enum AddTaskActions {
    EDIT_USERNAME = '@@task/EDIT_USERNAME',
    EDIT_EMAIL = '@@addTask/EDIT_EMAIL',
    EDIT_TEXT = '@@addTask/EDIT_TEXT',
    ADD_TASK_SUCCESS = '@@assTask/ADD_TASK_SUCCESS',
    ADD_TASK_ERROR = '@@addTask/ADD_TASK_ERROR',
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
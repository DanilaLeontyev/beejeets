import { Reducer } from 'redux'
import { AddTaskState, AddTaskActions } from './types';

export const initialState: AddTaskState = {
    username: '',
    email: '',
    text: '',
}

const reducer: Reducer<AddTaskState> = (state = initialState, action) => {
    switch (action.type) {
        case AddTaskActions.EDIT_EMAIL:
            return { ...state, email: action.payload }
        case AddTaskActions.EDIT_TEXT:
            return { ...state, text: action.payload }
        case AddTaskActions.EDIT_USERNAME:
            return { ...state, username: action.payload }
        case AddTaskActions.ADD_TASK_SUCCESS:
            return { ...state, username: '', text: '', email: '' }
        default: {
            return state
        }
    }
}

export { reducer as addTaskReducer }
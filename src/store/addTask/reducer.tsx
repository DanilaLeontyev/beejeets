import { Reducer } from 'redux'
import { AddTaskState } from './types';

export const initialState: AddTaskState = {
    username: '',
    email: '',
    text: '',
}

const reducer: Reducer<AddTaskState> = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state
        }
    }
}

export { reducer as addTaskReducer }
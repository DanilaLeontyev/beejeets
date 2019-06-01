import { Reducer } from 'redux'
import { TaskState, TaskActions } from './types'

export const initialState: TaskState = {
    tasks: [],
    totalTaskCount: 0,
    errorLoading: false,
    errorMessage: '',
    tasksLoading: false,
    taskSort: {
        sortField: 'id',
        sortDirection: 'asc',
    },
    page: 1
}

const reducer: Reducer<TaskState> = (state = initialState, action) => {
    switch (action.type) {
        case TaskActions.FETCH_TASK_START: {
            return { ...state, tasksLoading: true }
        }
        case TaskActions.FETCH_TASK_ERROR: {
            return { ...state, tasksLoading: false, errorLoading: true, errorMessage: action.payload }
        }
        case TaskActions.FETCH_TASK_SUCCESS: {
            return {
                ...state,
                tasksLoading: false,
                tasks: action.payload.tasks,
                totalTaskCount: parseInt(action.payload.total_task_count)
            }
        }
        case TaskActions.SET_PAGE: {
            return { ...state, page: action.payload }
        }
        case TaskActions.SET_SORT: {
            return {
                ...state,
                taskSort: {
                    sortField: action.payload.SortField,
                    sortDirection: action.SortDirection
                }
            }
        }
        default: {
            return state
        }
    }
}

export { reducer as taskReducer }
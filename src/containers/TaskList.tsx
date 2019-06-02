import React from 'react';
import { connect } from 'react-redux';
import { CustomThunkDispatch } from '../types/ThunkDispatch';
import { ApplicationState } from '../store';
import { TaskState, TaskSort, EditTask } from '../store/task/types';
import { fetchTask, changePage, changeSorting, editTask } from '../store/task/actions';
import TaskCard from '../components/TaskCard/TaskCard';
import Pagination from '../components/Pagination/Pagination';
import Filter from '../components/Filter/Filter';
import './TaskList.css'

interface TaskListActions {
    fetchTask: () => void;
    changePage: (pageNumber: number) => void;
    changeSorting: (sort: TaskSort) => void;
    editTask: (form: EditTask) => void;
}

interface TaskListProps {
    auth: boolean;
    task: TaskState;
    actions: TaskListActions
}

class TaskList extends React.Component<TaskListProps> {
    componentDidMount() {
        this.props.actions.fetchTask();
    }

    onChangePage = (pageNumber: number) => {
        this.props.actions.changePage(pageNumber)
    }

    onFilterChange = (sort: TaskSort) => {
        this.props.actions.changeSorting(sort)
    }

    onTaskSave = (form: EditTask) => {
        this.props.actions.editTask(form);
    }

    render() {
        const { auth } = this.props;
        const { tasksLoading, tasks, totalTaskCount, page } = this.props.task;
        return (
            <div>
                <Filter onChange={this.onFilterChange} filterName={'username'} />
                <Filter onChange={this.onFilterChange} filterName={'email'} />
                <Filter onChange={this.onFilterChange} filterName={'status'} />
                <div className='TaskList'>
                    {!tasksLoading &&
                        tasks.map(task => (
                            <TaskCard key={task.id} task={task} auth={auth} onSave={this.onTaskSave} />
                        ))
                    }
                    {tasksLoading && <div>Загрузка</div>}
                </div>
                <Pagination totalElement={totalTaskCount} changePage={this.onChangePage} currentPage={page} />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    task: state.task,
    auth: state.auth.authenticated,
})

const mapDispatchToProps = (dispatch: CustomThunkDispatch): { actions: TaskListActions } => {
    return ({
        actions: {
            fetchTask: () => dispatch(fetchTask()),
            changePage: (pageNumber: number) => dispatch(changePage(pageNumber)),
            changeSorting: (sort: TaskSort) => dispatch(changeSorting(sort)),
            editTask: (form: EditTask) => dispatch(editTask(form))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
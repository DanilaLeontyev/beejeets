import React from 'react';
import { connect } from 'react-redux';
import { CustomThunkDispatch } from '../types/ThunkDispatch';
import { ApplicationState } from '../store';
import { TaskState, TaskSort, AddTask, EditTask } from '../store/task/types';
import { fetchTask, addTask, changePage, changeSorting, editTask } from '../store/task/actions';
import TaskCard from '../components/TaskCard/TaskCard';
import Pagination from '../components/Pagination/Pagination';
import Filter from '../components/Filter/Filter';

interface TaskListActions {
    fetchTask: () => void;
    addTask: (form: AddTask) => void;
    changePage: (pageNumber: number) => void;
    changeSorting: (sort: TaskSort) => void;
    editTask: (form: EditTask) => void;
}

interface TaskListProps {
    auth: boolean;
    task: TaskState;
    actions: TaskListActions
}

interface TaskListState {
    form: {
        username: string;
        text: string;
        email: string;
    }
}

class TaskList extends React.Component<TaskListProps, TaskListState> {
    constructor(props: TaskListProps) {
        super(props);
        this.state = {
            form: {
                username: '',
                text: '',
                email: '',
            }
        }
    }

    componentDidMount() {
        this.props.actions.fetchTask();
    }

    addTask = () => {
        const { username, text, email } = this.state.form;
        this.props.actions.addTask({
            username: username,
            text: text,
            email: email,
        })

        this.setState({
            ...this.state,
            form: {
                username: '',
                text: '',
                email: ''
            }
        })
    }

    onChangePage = (pageNumber: number) => {
        this.props.actions.changePage(pageNumber)
    }

    onFilterChange = (sort: TaskSort) => {
        this.props.actions.changeSorting(sort)
    }

    onChangeInput = (value: string, field: string) => {
        this.setState({
            form: {
                ...this.state.form,
                [field]: value,
            }
        })
    }

    onTaskSave = (form: EditTask) => {
        this.props.actions.editTask(form);
    }

    render() {
        const { auth } = this.props;
        const { tasksLoading, tasks, totalTaskCount } = this.props.task;
        const { username, text, email } = this.state.form;
        return (
            <div>
                <input placeholder='Имя пользователя' type="text" value={username} onChange={(value) =>
                    this.onChangeInput(value.target.value, 'username')} />
                <input placeholder='Название задачи' type="text" value={text} onChange={(value) =>
                    this.onChangeInput(value.target.value, 'text')} />
                <input placeholder='e-mail' type="email" value={email} onChange={(value) =>
                    this.onChangeInput(value.target.value, 'email')} /> <br />

                <button onClick={this.addTask}>Добавить задачу</button> <br />

                <Filter onChange={this.onFilterChange} filterName={'id'} />
                <Filter onChange={this.onFilterChange} filterName={'username'} />
                <Filter onChange={this.onFilterChange} filterName={'email'} />
                <Filter onChange={this.onFilterChange} filterName={'status'} />

                {!tasksLoading &&
                    tasks.map(task => (
                        <TaskCard key={task.id} task={task} auth={auth} onSave={this.onTaskSave} />
                    ))
                }
                {tasksLoading && <div>Загрузка</div>}
                <Pagination totalElement={totalTaskCount} changePage={this.onChangePage} />
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
            addTask: (form: AddTask) => dispatch(addTask(form)),
            changePage: (pageNumber: number) => dispatch(changePage(pageNumber)),
            changeSorting: (sort: TaskSort) => dispatch(changeSorting(sort)),
            editTask: (form: EditTask) => dispatch(editTask(form))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
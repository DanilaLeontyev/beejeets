import React from 'react';
import { ApplicationState } from '../store';
import { CustomThunkDispatch } from '../types/ThunkDispatch';
import { AddTaskState } from '../store/addTask/types';
import { AddTaskForm } from '../store/addTask/types';
import { createTask } from '../store/addTask/actions';
import { connect } from 'react-redux';

interface AddTaskAction {
    createTask: (form: AddTaskForm) => void;
}

interface AddTaskProps {
    task: AddTaskState
    actions: AddTaskAction
}

const AddTask: React.FC<AddTaskProps> = (props: AddTaskProps) => {
    const { username, text, email } = props.task
    return (
        <div>
            <input placeholder='Имя пользователя' type="text" value={username} />
            <input placeholder='Название задачи' type="text" value={text} />
            <input placeholder='e-mail' type="email" value={email} /> <br />
            <button onClick={() => props.actions.createTask({ username: username, text: text, email: email })}>
                Добавить задачу
            </button> <br />
        </div>
    )
}


const mapStateToProps = (state: ApplicationState) => ({
    task: state.addTask
})

const mapDispatchToProps = (dispatch: CustomThunkDispatch): { actions: AddTaskAction } => {
    return ({
        actions: {
            createTask: (form: AddTaskForm) => dispatch(createTask(form)),
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
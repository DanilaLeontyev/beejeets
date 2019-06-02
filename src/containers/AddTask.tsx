import React from 'react';
import { ApplicationState } from '../store';
import { CustomThunkDispatch } from '../types/ThunkDispatch';
import { AddTaskState } from '../store/addTask/types';
import { AddTaskForm } from '../store/addTask/types';
import { createTask, editUsername, editText, editEmail } from '../store/addTask/actions';
import { connect } from 'react-redux';
import './AddTask.css'

interface AddTaskAction {
    createTask: (form: AddTaskForm) => void;
    editEmail: (value: string) => void;
    editUsername: (value: string) => void;
    editText: (value: string) => void;
}

interface AddTaskProps {
    task: AddTaskState
    actions: AddTaskAction
}

const AddTask: React.FC<AddTaskProps> = (props: AddTaskProps) => {
    const { username, text, email } = props.task

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.actions.editUsername(e.target.value)
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.actions.editText(e.target.value)
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.actions.editEmail(e.target.value)
    }

    const onAddTask = () => {
        props.actions.createTask({ username: username, text: text, email: email })
    }

    return (
        <div className='AddTask'>
            <input placeholder='Имя пользователя' type="text" value={username} onChange={onUsernameChange} />
            <input placeholder='Название задачи' type="text" value={text} onChange={onTextChange} />
            <input placeholder='e-mail' type="email" value={email} onChange={onEmailChange} />
            <button className='AddTask--addButton' onClick={onAddTask}>
                Добавить задачу
            </button>
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
            editUsername: (value: string) => dispatch(editUsername(value)),
            editEmail: (value: string) => dispatch(editEmail(value)),
            editText: (value: string) => dispatch(editText(value)),

        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
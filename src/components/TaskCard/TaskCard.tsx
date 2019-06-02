import React from 'react';
import { Task, EditTask } from '../../store/task/types';
import './TaskCard.css'

interface TaskCardProps {
    auth?: boolean;
    task: Task;
    onSave: (form: EditTask) => void;
}

interface TaskCardState {
    text: string;
    status: 0 | 10;
}

class TaskCard extends React.Component<TaskCardProps, TaskCardState> {
    constructor(props: TaskCardProps) {
        super(props);
        this.state = {
            text: '',
            status: 0,
        }
    }

    onClickSave = () => {
        this.props.onSave({
            id: this.props.task.id,
            text: this.state.text,
            status: this.state.status ? this.state.status : this.props.task.status,
        });
    }

    onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            text: e.target.value,
        })
    }

    onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            status: this.state.status ? 0 : 10,
        })
    }

    render() {
        const { text, email, status, username } = this.props.task;
        const { text: textState, status: statusState } = this.state
        const { auth } = this.props;
        let checkboxStatus = statusState ? Boolean(statusState) : Boolean(status)
        return (
            <div className='TaskCard'>
                <div className='TaskCard--userInfo'>
                    <input type='checkbox'
                        disabled={!auth || status ? true : false}
                        checked={checkboxStatus}
                        onChange={this.onChangeStatus} />
                    <span>{email}</span>
                    <span>{username}</span>
                </div>
                <div className='TaskCard--text'>
                    {!auth
                        ? <div>{text}</div>
                        : <input className='TaskCard--textInput'
                            type="text"
                            value={textState ? textState : text}
                            onChange={this.onChangeText} />
                    }
                    <button hidden={!auth}
                        onClick={this.onClickSave}>
                        Сохранить
                    </button>
                </div>
            </div>
        )
    }
}

export default TaskCard;

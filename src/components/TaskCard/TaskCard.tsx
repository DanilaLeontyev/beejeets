import React from 'react';
import { Task } from '../../store/task/types';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const { text, email, status, username, id } = props.task;
    return (
        <div className="TaskCard">
            {id} {text} {email} {status} {username}
        </div>
    )
}

export default TaskCard;

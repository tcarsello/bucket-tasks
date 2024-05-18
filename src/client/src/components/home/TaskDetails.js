import '../../css/Bucket.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'

import { GrFormClose } from 'react-icons/gr'

const TaskDetails = ({task, renderFunc}) => {

    const { user } = useAuthContext()

    const [isCompleted, setIsCompleted] = useState(task.completed)

    const handleCheckChange = async (e) => {

        setIsCompleted(!isCompleted)

        const bodyContent = {completed: !isCompleted}

        const response = await fetch(`/api/task/status/${task.taskId}`, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

    }

    const handleRemove = async (e) => {

        const response = await fetch(`/api/task/${task.taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        renderFunc()

    }

    const classString = `task-container ${task.completed ? 'task-item-true' : 'task-item-false'}`

    return (
        <div className={`task-container ${isCompleted ? 'task-item-true' : 'task-item-false'}`}>
            <div>
            <input 
                type='checkbox'
                defaultChecked={task.completed}
                onChange={handleCheckChange}    
            ></input>
            </div>
            <div style={{marginLeft: '15px'}}>
                <strong>{task.taskName}</strong>
                <br />
                <span>{task.taskDescription}</span>           
            </div>
            <GrFormClose
                style={{float: 'right', height: '30px', width: '30px'}}
                onClick={handleRemove}
            />
        </div>
    )
}

export default TaskDetails
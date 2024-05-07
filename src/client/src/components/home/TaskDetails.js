import '../../css/Bucket.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'

const TaskDetails = ({task}) => {

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
        </div>
    )
}

export default TaskDetails
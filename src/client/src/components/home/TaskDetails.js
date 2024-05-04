import '../../css/Bucket.css'

const TaskDetails = ({task}) => {
    return (
        <div class='task-container'>
            <span>Task Name: {task.taskName}</span>
            <br/>
            <span>Task Descripiton: {task.taskDescription}</span>
        </div>
    )
}

export default TaskDetails
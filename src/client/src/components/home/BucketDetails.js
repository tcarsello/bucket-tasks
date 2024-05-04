import '../../css/Bucket.css'

import { useAuthContext } from '../../hooks/useAuthContext'

import { GrEdit, GrTrash, GrAdd } from 'react-icons/gr'

import { useState, useEffect } from 'react'

import { EditBucketForm, DeleteBucketForm, AddTaskForm } from './BucketActions.js'

import TaskDetails from './TaskDetails.js'

const BucketDetails = ({ bucket, triggerRender }) => {

    const { user } = useAuthContext()

    const [editBucketPopupEnabled, setEditBucketPopupEnabled] = useState(false)
    const [deleteBucketPopupEnabled, setDeleteBucketPopupEnabled] = useState(false)
    const [addTaskPopupEnabled, setAddTaskPopupEnabled] = useState(false)
    const [taskList, setTaskList] = useState(null)
    const [reloadTaskList, setReloadtaskList] = useState(false)

    const renderBucketEdit = () => {
        return (
        <div style={{marginTop: '15px'}}>
                {editBucketPopupEnabled ? <EditBucketForm bucket={bucket} onClose={() => {
                    setEditBucketPopupEnabled(false)
                    triggerRender()
                }}/> : null}

                {deleteBucketPopupEnabled ? <DeleteBucketForm bucket={bucket} onClose={() => {
                    setDeleteBucketPopupEnabled(false)
                    triggerRender()
                }}/> : null}

                {addTaskPopupEnabled ? <AddTaskForm bucket={bucket} onClose={() => {
                    setAddTaskPopupEnabled(false)
                    triggerRender()
                }}/>: null}

        </div>)
    }

    useEffect(() => {
        
        fetch(`/api/task/${bucket.bucketId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then((response) => {
            response.json().then((json) => {
                setTaskList(json.tasks)
            })
        })

    }, [user, bucket, reloadTaskList])

    return (
        <div className='bucket-details-container'>
            <div className='bucket-details-header'>
                <span style={{fontWeight: 'bold', fontSize: '1.1em'}}>{bucket.bucketName}</span>
                <span style={{color: 'grey', fontStyle: 'italic'}}>{bucket.description}</span>
                <GrEdit onClick={() => setEditBucketPopupEnabled(true)}/>
                <GrTrash style={{float: 'right'}} onClick={() => setDeleteBucketPopupEnabled(true)}/>
            </div>
            <div>
                <button className='button-color' onClick={() => setAddTaskPopupEnabled(true)}>+ Task</button>
            </div>
            {taskList && taskList.map((task) => (
                <TaskDetails key={task.taskId} task={task} />
            ))}
            {renderBucketEdit()}
        </div>
    )

}

export default BucketDetails
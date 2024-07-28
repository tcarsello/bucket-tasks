import { useAuthContext } from "../../hooks/useAuthContext"

import { GrEdit, GrTrash, GrAdd } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import { EditListForm, DeleteListForm } from "./ListsActions"
import Collapsible from "../Collapsible"
import TaskDetails from "./TaskDetails"

const ListDetails = ({ list, triggerRender }) => {
    
    const { user } = useAuthContext()

    const [editListPopupEnabled, setEditListPopupEnabled] = useState(false)
    const [deleteListPopupEnabled, setDeleteListPopupEnabled] = useState(false)
    const [manageBucketsPopupEnabled, setManageBucketsPopupEnabled] = useState(false)

    const [taskList, setTaskList] = useState([])
    const [bucketList, setBucketList] = useState(null)
    const [reloadBucketList, setReloadBucketList] = useState(null)
    const [reloadTaskList, setReloadTaskList] = useState(false)

    useEffect(() => {

        fetch(`/api/list/${list.listId}/buckets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            response.json().then(json => {
                setBucketList(json.buckets)
            })
        })

    }, [user, list, reloadBucketList])

    useEffect(() => {
        
        if (!bucketList) return;

        const fetchTasks = async () => {
            setTaskList([]);
            const tasks = await Promise.all(
                bucketList.map(bucket =>
                    fetch(`/api/task/${bucket.bucketId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    .then(response => response.json())
                    .then(json => 
                        json.tasks.map(task => ({
                            ...task,
                            bucketName: bucket.bucketName
                        }))
                    )
                )
            )

            const allTasks = tasks.flat()
            setTaskList(allTasks);
        }

        fetchTasks();

    }, [bucketList])

    const reloadTasks = () => {
        setReloadTaskList(!reloadTaskList)
    }

    const renderListEdit = () => {
        return (
            <div style={{marginTop: '15px'}}>
                {editListPopupEnabled ? <EditListForm list={list} onClose={() => {
                    setEditListPopupEnabled(false)
                    triggerRender()
                }}/> : null}
                {deleteListPopupEnabled ? <DeleteListForm list={list} onClose={() => {
                    setDeleteListPopupEnabled(false)
                    triggerRender()
                }}/> : null}
                {manageBucketsPopupEnabled ? <p>Test3</p> : null}
            </div>
        )
    }

    return (<>
        <div className='bucket-details-container'>
            <div className='bucket-details-header'>
                <span style={{fontWeight: 'bold', fontSize: '1.3em'}}>{list.listName}</span>
                <span style={{color: 'grey', fontStyle: 'italic'}}>{list.description}</span>
                <GrEdit onClick={() => setEditListPopupEnabled(true)}/>
                <GrTrash style={{float: 'right'}} onClick={() => setDeleteListPopupEnabled(true)}/>
            </div>
            <div>
                <button className='button-color' onClick={() => setManageBucketsPopupEnabled(true)}>Manage List Buckets</button>
            </div>
            <div >
                <Collapsible title={`${bucketList ? bucketList.length : 0} buckets`}>
                    {bucketList ?
                        <ul style={{margin: 0, paddingLeft: '20px'}}>
                            {bucketList.map(bucket => {
                                return (
                                    <li style={{paddingBottom: '5px'}}>
                                        <span style={{color: '#2375cc', fontWeight: 'bold'}}>{bucket.bucketName}</span>
                                        <span style={{color: 'gray', fontStyle: 'italic'}}> - {bucket.description}</span>
                                    </li>
                                )
                            })} 
                        </ul>
                        : null
                    }
                </Collapsible>
                <Collapsible title={`${taskList ? taskList.reduce((count, task) => count + (!task.completed ? 1 : 0), 0) : 0} / ${taskList ? taskList.length : 0} tasks remaining`}>
                    {taskList.length > 0 ?
                        <table class="task-table">
                            <tr>
                                <th class="task-table-col1"> Task Name</th>
                                <th class="task-table-col2">Description</th>
                                <th class="task-table-col3">Bucket</th>
                            </tr>
                            {taskList.filter(task => !task.completed).map(task => (
                                <tr>
                                    <td class="task-table-col1">{task.taskName}</td>
                                    <td class="task-table-col2" style={{color: 'grey'}}>{task.taskDescription}</td>
                                    <td class="task-table-col3" style={{color: '#2375cc', fontWeight: 'bold'}}>{task.bucketName}</td>
                                </tr>
                            ))}
                        </table>

                        : null
                    }
                </Collapsible>
            </div>
            {renderListEdit()}
        </div>
    </>)
}

export default ListDetails
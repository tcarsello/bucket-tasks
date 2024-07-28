import { useAuthContext } from "../../hooks/useAuthContext"

import { GrEdit, GrTrash, GrAdd } from 'react-icons/gr'
import { useState, useEffect } from 'react'
import { EditListForm, DeleteListForm } from "./ListsActions"
import Collapsible from "../Collapsible"

const ListDetails = ({ list, triggerRender }) => {
    
    const { user } = useAuthContext()

    const [editListPopupEnabled, setEditListPopupEnabled] = useState(false)
    const [deleteListPopupEnabled, setDeleteListPopupEnabled] = useState(false)
    const [manageBucketsPopupEnabled, setManageBucketsPopupEnabled] = useState(false)

    const [taskList, setTaskList] = useState(null)
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
                        <ul style={{margin: 0}}>
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
            </div>
            {renderListEdit()}
        </div>
    </>)
}

export default ListDetails
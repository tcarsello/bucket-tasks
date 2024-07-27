import { useAuthContext } from "../../hooks/useAuthContext"

import { useState, useEffect } from 'react'
import { CreateListForm } from './ListsActions.js'

const ListsComponent = () => {

    const { user } = useAuthContext()

    const [lists, setLists] = useState(null)
    const [error, setError] = useState(null)
    const [createListPopupEnabled, setCreateListPopupEnabled] = useState(false)
    const [reloadListState, setReloadListState] = useState(false)

    useEffect(() => {

        fetch(`/api/list/getall/${user.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {

            setError(null)
            response.json().then(json => {
                setLists(json.lists)
            })
        }).catch(error => {
            console.log(error)
            setError(error)
        })

    }, [reloadListState, user, createListPopupEnabled])

    const relaodLists = () => {
        setReloadListState(!reloadListState)
    }

    const renderListActions = () => {
        return (
            <div style={{marginTop: '15px'}}>
                {createListPopupEnabled ? <CreateListForm onClose={() => setCreateListPopupEnabled(false)}/> : null}
            </div>
        )
    }

    return (<>
        <h2 className='home-content-header'>Lists</h2>
        {error ? <span>{error}</span> : null}
        <div style={{marginBottom: '15px'}}>
            <div>
                <button className='button-main' style={{maxWidth: '10px'}} onClick={() => setCreateListPopupEnabled(true)}>Create a New List</button>
            </div>
            {renderListActions()}
        </div>
    </>)

}

export default ListsComponent
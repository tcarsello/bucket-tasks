import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export const CreateListForm = ({onClose}) => {

    const { user } = useAuthContext()

    const [listName, setListName] = useState("")
    const [listDescription, setListDescription] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        const bodyContent = { userId: user.userId, listName, description: listDescription }
        const response = await fetch(`/api/list`, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        onClose()

    }

    return (
        <div className="popup-form-backdrop">
            <div className="popup-form">
                <form onSubmit={handleSubmit} className='settings-form'>
                    <h3>Create a New List</h3>

                    <div>
                        <label>List Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>List Description:</label>
                        <input
                            type='text'
                            name='description'
                            value={listDescription}
                            onChange={(e) => setListDescription(e.target.value)}
                        />
                    </div>

                    <button type="submit">Create</button>
                    <button style={{marginLeft: '10px'}} type="none" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    )

}

export const EditListForm = ({onClose, list}) => {
    
    const { user } = useAuthContext()

    const [listName, setListName] = useState(list.listName)
    const [listDescription, setListDescription] = useState(list.description)

    const handleSubmit = async (e) => {

        e.preventDefault()

        const bodyContent = { listName, description: listDescription }
        const response = await fetch(`/api/list/${list.listId}`, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        onClose()

    }

    return (
        <div className="popup-form-backdrop">
            <div className="popup-form">
                <form onSubmit={handleSubmit} className='settings-form'>
                    <h3>Update Existing List</h3>

                    <div>
                        <label>List Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>List Description:</label>
                        <input
                            type='text'
                            name='description'
                            value={listDescription}
                            onChange={(e) => setListDescription(e.target.value)}
                        />
                    </div>

                    <button type="submit">Update</button>
                    <button style={{marginLeft: '10px'}} type="none" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    )
}

export const DeleteListForm = ({onClose, list}) => {

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch(`/api/list/${list.listId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        onClose()
    }

    return (
        <div className="popup-form-backdrop">
            <div className="popup-form">
                <form onSubmit={handleSubmit} className='settings-form'>
                    <h3>Delete List</h3>
                    <p>Are you sure you want to delete <strong>{list.listName}</strong>?</p>
                    <button type="submit">Delete</button>
                    <button style={{marginLeft: '10px'}} type="none" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )

}
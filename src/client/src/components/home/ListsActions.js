import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export const CreateListForm = ({onClose}) => {

    const { user } = useAuthContext()

    const [listName, setListName] = useState(null)
    const [listDescription, setListDescription] = useState(null)

    const handleSubmit = async (e) => {

        const bodyContent = { userId: user.userId, listName, description: listDescription }
        const response = fetch(`/api/list`, {
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
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

export const CreateBucketForm = ({onClose}) => {

    const { user } = useAuthContext()

    const [bucketName, setBucketName] = useState()
    const [description, setDescription] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const bodyContent = { bucketName, description }
        const response = await fetch(`/api/bucket`, {
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
                    <h3>Create a New Bucket</h3>
                    
                    <div>
                        <label>Bucket Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={bucketName}
                            onChange={(e) => setBucketName(e.target.value)}
                            required
                       />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="name"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                       />
                    </div>

                    <button type="submit">Create</button>
                    <button style={{marginLeft: '10px'}} type="none" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    )

}

export const EditBucketForm = ({onClose, bucket}) => {

    const { user } = useAuthContext()

    const [bucketName, setBucketName] = useState(bucket.bucketName)
    const [description, setDescription] = useState(bucket.description)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const bodyContent = { bucketName, description }
        const response = await fetch(`/api/bucket/${bucket.bucketId}`, {
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
                    <h3>Update Existing Bucket</h3>
                    
                    <div>
                        <label>Bucket Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={bucketName}
                            onChange={(e) => setBucketName(e.target.value)}
                            required
                       />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="name"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                       />
                    </div>

                    <button type="submit">Update</button>
                    <button style={{marginLeft: '10px'}} type="none" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    )

}

export const DeleteBucketForm = ({onClose, bucket}) => {

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch(`/api/bucket/${bucket.bucketId}`, {
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
                    <h3>Delete Bucket</h3>
                    <p>Are you sure you want to delete <strong>{bucket.bucketName}</strong>?</p>
                    <button type="submit">Delete</button>
                    <button style={{marginLeft: '10px'}} type="none" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )

}
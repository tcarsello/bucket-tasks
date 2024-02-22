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

                    <button type="submit">Submit</button>
                    <button style={{marginLeft: '10px'}} type="none" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    )

}

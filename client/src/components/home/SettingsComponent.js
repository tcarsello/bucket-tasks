import { useState } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext'

import '../../css/Home.css'

const SettingsComponent = () => {

    const { user, dispatch } = useAuthContext()

    const [email, setEmail] = useState(user.email)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [error, setError] = useState()
    const [workedMsg, setWorkedMsg] = useState()

    const handleAccountInfoSubmit = async (e) => {
        e.preventDefault()

        const bodyContent = { email, firstName, lastName }
        const response = await fetch(`/api/user/${user.userId}`, {
            method: 'PATCH',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            return
        }

        setError(null)
        setWorkedMsg('Updated!')
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
        
    }

    return (<>
        <h2 className='home-content-header'>Settings</h2>
        <div id='settings-categories-container'>
            <div className='settings-category'>
                <form className='settings-form' onSubmit={handleAccountInfoSubmit}>
                    <h3>Update Account Information</h3>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update Information</button>
                    {error ? <span className='form-error'>{error}</span>: null}
                    {workedMsg ? <span className='form-worked-msg'>{workedMsg}</span>: null}
                </form>
            </div>
            <div className='settings-category'>
                <h3>Account Functions</h3>
            </div>
        </div>
    </>)

}

export default SettingsComponent
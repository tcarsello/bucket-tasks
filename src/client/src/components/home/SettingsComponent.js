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

    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorPassword, setErrorPassword] = useState()
    const [workedMsgPassword, setWorkedMsgPassword] = useState()

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
            setWorkedMsg(null)
            return
        }

        setError(null)
        setWorkedMsg('Updated!')
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
        
    }

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault()

        if (password1 !== password2) {
            setErrorPassword('Passwords do not match!')
            return
        } else {
            setErrorPassword()
        }

        const bodyContent = { password: password1 }
        const response = await fetch(`/api/user/reset/${user.userId}`, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setErrorPassword(json.error)
            setWorkedMsgPassword(null)
        }

        setErrorPassword(null)
        setWorkedMsgPassword('Password Updated!')

    }

    const handleDeleteAccount = async (e) => {
        
        if (!window.confirm("Are you sure you want to delete your account?")) {
            return
        }

        const bodyContent = { email: user.email }
        const response = await fetch(`/api/user/delete`, {
            method: 'DELETE',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        if (response.ok) {
            localStorage.removeItem('user')
            dispatch({type: 'LOGOUT'})
        }

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
                <form className='settings-form' onSubmit={handleChangePasswordSubmit}>
                    <h4>Change Password</h4>
                    <div>
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Retype New Password</label>
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update Password</button>
                    {errorPassword ? <span className='form-error'>{errorPassword}</span>: null}
                    {workedMsgPassword ? <span className='form-worked-msg'>{workedMsgPassword}</span>: null}
                </form>
                <h4 style={{marginBottom: '0'}}>Permanently Delete Account</h4>
                
                <button className='button-main' onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        </div>
    </>)

}

export default SettingsComponent
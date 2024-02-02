import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';

import '../css/Login.css'

const Register = () => {

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      });
      const { dispatch } = useAuthContext();

      const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (formData.password != formData.confirmPassword) {
            setError('Passwords do not match!')
            return
        } else {
            setError()
        }

        const bodyContent = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            password: formData.password
        }
        const response = await fetch(`/api/user/register`, {
            method: 'POST',
            body: JSON.stringify(bodyContent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            return
        }

        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Register Account</h3>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Retype Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Register</button>
            {error ? <span className='form-error'>{error}</span>: null}
        </form>
    )

}

export default Register
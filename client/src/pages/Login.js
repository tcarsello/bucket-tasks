import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      });
      const { dispatch } = useAuthContext();

      const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const bodyContent = {
            email: formData.email,
            password: formData.password
        }
        const response = await fetch(`/api/user/login`, {
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
            <h3>Log In</h3>
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
            <button type="submit">Register</button>
            {error ? <span className='form-error'>{error}</span>: null}
        </form>
    )

}

export default Login
import '../css/Navbar.css'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

    const { user, dispatch } = useAuthContext()

    const handleLogout = async () => {
        
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})

    }

    return (
        <nav className='top-nav'>
            <div className="top-nav-brand">Bucket Tasks</div>
            {!user ? <div className="top-nav-links">
                    <a href="/register">Register</a>
                    <a href="/login">Log In</a>
                </div>
                : <div>
                    <span>{`${user.firstName} ${user.lastName} <${user.email}>`}</span>
                    <button className="logout" onClick={handleLogout}>Log out</button>
                </div>
            }
        </nav>
    )

}

export default Navbar
import '../css/Home.css'
import { useAuthContext } from '../hooks/useAuthContext'

const Leftnav = ({setChoice}) => {

    const { user } = useAuthContext()
    return (
        <nav className='left-nav'>
            <button onClick={() => setChoice('dashboard')}>Dashboard</button>
            <button onClick={() => setChoice('buckets')}>Buckets</button>
            <button onClick={() => setChoice('lists')}>Lists</button>
            <button onClick={() => setChoice('settings')}>Settings</button>
        </nav>
    )

}

export default Leftnav
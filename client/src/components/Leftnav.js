import '../css/Home.css'
import { useAuthContext } from '../hooks/useAuthContext'

const Leftnav = () => {

    const { user } = useAuthContext()
    return (
        <nav className='left-nav'>
            <a>Dashboard</a>
            <a>Buckets</a>
            <a>Lists</a>
            <a>Settings</a>
        </nav>
    )

}

export default Leftnav
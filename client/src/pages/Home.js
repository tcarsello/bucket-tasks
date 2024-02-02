import { useAuthContext } from "../hooks/useAuthContext"

import '../css/Home.css'
import Leftnav from "../components/Leftnav"

const Home = () => {

    const { user } = useAuthContext()

    return (
        <div className='home-container'>
            <Leftnav />
        </div>
    )

}

export default Home
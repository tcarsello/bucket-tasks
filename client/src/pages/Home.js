import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {

    const { user } = useAuthContext()

    return (<div>{user.email}</div>)

}

export default Home
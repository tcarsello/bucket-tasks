import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

import '../css/Home.css'

import Leftnav from "../components/Leftnav"
import DashboardComponent from "../components/home/DashboardComponent"
import BucketsComponent from "../components/home/BucketsComponent"
import ListsComponent from "../components/home/ListsComponent"
import SettingsComponent from "../components/home/SettingsComponent"

const Home = () => {

    const { user } = useAuthContext()
    const [ navChoice, setNavChoice ] = useState('')

    const renderContent = () => {
        switch (navChoice) {
            case 'buckets':
                return <BucketsComponent />
            case 'lists':
                return <ListsComponent />
            case 'settings':
                return <SettingsComponent />
            case 'dashboard':
            default:
                return <DashboardComponent />
        }
    }

    return (
        <div className='home-container'>
            <Leftnav setChoice={setNavChoice} />
            <div className='home-content'>
                {renderContent()}
            </div>
        </div>
    )

}

export default Home
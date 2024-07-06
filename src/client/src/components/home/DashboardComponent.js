import { useState, useEffect } from 'react'

import "../../css/Dashboard.css"
import { useAuthContext } from '../../hooks/useAuthContext'

const DashboardComponent = () => {

    const { user } = useAuthContext()

    const [numBuckets, setNumBuckets] = useState(0)
    const [numActiveBuckets, setNumActiveBuckets] = useState(0)
    const [numCompletedTasks, setNumCompletedTasks] = useState(0)
    const [totalTasks, setTotalTasks] = useState(0)
    const [incompleteTasks, setIncompleteTasks] = useState(null)

    useEffect(() => {
        fetch(`/api/user/${user.userId}/dash`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((json) => {

                    if (json.numBuckets) setNumBuckets(json.numBuckets)
                    if (json.numActiveBuckets) setNumActiveBuckets(json.numActiveBuckets)
                    if (json.numCompletedTasks) setNumCompletedTasks(json.numCompletedTasks)
                    if (json.numTotalTasks) setTotalTasks(json.numTotalTasks)
                    if (json.incompleteTasks) setIncompleteTasks(json.incompleteTasks)

                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err  => {
            console.log(err)
        })
    }, [user])

    return (<>
        <h2 className='home-content-header'>Dashboard</h2>
        <div class="dash-container">
            <div class="dash-card-row">
                <div class="dash-card dash-top-card">
                    <span style={{fontWeight: 'Bold', fontSize: '1.5rem'}}>{numBuckets} Buckets Created</span>
                    <span>{numActiveBuckets} Active (contain tasks)</span>
                </div>
                <div class="dash-card dash-top-card" style={{fontWeight: 'Bold', fontSize: '1.5rem'}}>
                    <span>{numCompletedTasks} / {totalTasks} Tasks Complete</span>
                    <progress value={numCompletedTasks} max={totalTasks}/>
                </div>
            </div>
            <div class="dash-card">
                <h3>Incomplete Tasks</h3>
                <table class="task-table">
                    <tr>
                        <th class="task-table-col1"> Task Name</th>
                        <th class="task-table-col2">Description</th>
                        <th class="task-table-col3">Bucket</th>
                    </tr>
                    {incompleteTasks && incompleteTasks.map((task) => {
                            return (<tr>
                                <td class="task-table-col1">{task.taskName}</td>
                                <td class="task-table-col2">{task.taskDescription}</td>
                                <td class="task-table-col3">{task.Bucket.bucketName}</td>
                            </tr>)
                        })}
                </table>
            </div>
        </div>
    </>)

}

export default DashboardComponent
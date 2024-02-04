import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

import BucketDetails from './BucketDetails'

const BucketsComponent = () => {

    const { user } = useAuthContext()

    const [bucketList, setBucketList] = useState()
    const [error, setError] = useState()

    useEffect(() => {

        fetch(`/api/bucket/getall/${user.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then((response) => {

            response.json().then((json) => { setBucketList(json.buckets) })

        }).catch(err => {
            console.log(err)
            setError(err)
        })

    }, [user])

    return (<>
        <h2 className='home-content-header'>Buckets</h2>
        { error ? <span>{error}</span> : null}
        {bucketList && bucketList.map((bucket) => (
            <BucketDetails key={bucket.bucketId} bucket={bucket}/>
        ))}
    </>)

}

export default BucketsComponent
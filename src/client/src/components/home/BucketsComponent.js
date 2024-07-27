import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

import BucketDetails from './BucketDetails'

import { CreateBucketForm } from './BucketActions.js'

const BucketsComponent = () => {

    const { user } = useAuthContext()

    const [bucketList, setBucketList] = useState()
    const [error, setError] = useState()

    const [createBucketPopupEnabled, setCreateBucketPopupEnabled] = useState(false)
    const [reloadBucketsState, setReloadBuckets] = useState(false)

    const reloadBuckets = () => {
        setReloadBuckets(!reloadBucketsState)
    }

    useEffect(() => {

        fetch(`/api/bucket/getall/${user.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then((response) => {

            response.json().then((json) => { 
                setBucketList(json.buckets) 
            })

        }).catch(err => {
            console.log(err)
            setError(err)
        })

    }, [reloadBucketsState, user, createBucketPopupEnabled])

    const renderBucketActions = () => {

        return (
            <div style={{marginTop: '15px'}}>
                {createBucketPopupEnabled ? <CreateBucketForm onClose={() => setCreateBucketPopupEnabled(false)}/> : null}
            </div>
        )
    
    }

    return (<>
        <h2 className='home-content-header'>Buckets</h2>
        { error ? <span>{error}</span> : null}
        <div style={{marginBottom: '15px'}}>
            <div>
                <button className='button-main' style={{maxWidth: '10px'}} onClick={() => setCreateBucketPopupEnabled(true)}>Create a New Bucket</button>
            </div>
            {renderBucketActions()}
        </div>
        <div style={{borderTop: '2px solid #ccc', paddingTop: '15px'}}>
            {bucketList && bucketList.map((bucket) => (
                <BucketDetails key={bucket.bucketId} bucket={bucket} triggerRender={reloadBuckets}/>
            ))}
        </div>
    </>)

}

export default BucketsComponent
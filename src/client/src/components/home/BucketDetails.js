import '../../css/Bucket.css'

import { GrEdit, GrTrash } from 'react-icons/gr'

import { useState, useEffect } from 'react'

import { EditBucketForm, DeleteBucketForm } from './BucketActions.js'

const BucketDetails = ({ bucket, triggerRender }) => {

    const [editBucketPopupEnabled, setEditBucketPopupEnabled] = useState(false)
    const [deleteBucketPopupEnabled, setDeleteBucketPopupEnabled] = useState(false)

    const renderBucketEdit = () => {
        return (
        <div style={{marginTop: '15px'}}>
                {editBucketPopupEnabled ? <EditBucketForm bucket={bucket} onClose={() => {
                    setEditBucketPopupEnabled(false)
                    triggerRender()
                }}/> : null}

                {deleteBucketPopupEnabled ? <DeleteBucketForm bucket={bucket} onClose={() => {
                    setDeleteBucketPopupEnabled(false)
                    triggerRender()
                }}/> : null}
        </div>)
    }

    return (
        <div className='bucket-details-container'>
            <div className='bucket-details-header'>
                <span style={{fontWeight: 'bold', fontSize: '1.1em'}}>{bucket.bucketName}</span>
                <span style={{color: 'grey', fontStyle: 'italic'}}>{bucket.description}</span>
                <GrEdit onClick={() => setEditBucketPopupEnabled(true)}/>
                <GrTrash style={{float: 'right'}} onClick={() => setDeleteBucketPopupEnabled(true)}/>
                {renderBucketEdit()}
            </div>
        </div>
    )

}

export default BucketDetails
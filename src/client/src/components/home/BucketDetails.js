import '../../css/Bucket.css'

const BucketDetails = ({ bucket }) => {

    return (
        <div className='bucket-details-container'>
            <div className='bucket-details-header'>
                <span style={{fontWeight: 'bold', fontSize: '1.1em'}}>{bucket.bucketName}</span>
                <span style={{color: 'grey', fontStyle: 'italic'}}>{bucket.description}</span>
            </div>
        </div>
    )

}

export default BucketDetails
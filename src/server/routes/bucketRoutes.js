const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { getAllBuckets, createBucket, updateBucket } = require('../controllers/bucketConroller.js')

const router = express.Router()

router.get('/getall/:userId', requireAuth, getAllBuckets)
router.post('/', requireAuth, createBucket)
router.patch('/:bucketId', requireAuth, updateBucket)

module.exports = router
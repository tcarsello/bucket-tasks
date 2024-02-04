const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { getAllBuckets } = require('../controllers/bucketConroller.js')

const router = express.Router()

router.get('/getall/:userId', requireAuth, getAllBuckets)

module.exports = router
const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { createTask, getAllTasks } = require('../controllers/taskController')

const router = express.Router()

router.post('/', requireAuth, createTask)
router.get('/:bucketId', requireAuth, getAllTasks)

module.exports = router
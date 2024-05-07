const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { createTask, getAllTasks, updateTaskStatus } = require('../controllers/taskController')

const router = express.Router()

router.post('/', requireAuth, createTask)
router.get('/:bucketId', requireAuth, getAllTasks)
router.post('/status/:taskId', requireAuth, updateTaskStatus)

module.exports = router
const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { createTask, getAllTasks, updateTaskStatus, clearTasks, removeTask } = require('../controllers/taskController')

const router = express.Router()

router.post('/', requireAuth, createTask)
router.get('/:bucketId', requireAuth, getAllTasks)
router.post('/status/:taskId', requireAuth, updateTaskStatus)
router.delete('/clear/:bucketId', requireAuth, clearTasks)
router.delete('/:taskId', requireAuth, removeTask)

module.exports = router
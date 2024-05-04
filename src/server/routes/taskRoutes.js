const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { CreateTask } = require('../controllers/taskController')

const router = express.Router()

router.post('/', requireAuth, CreateTask)

module.exports = router
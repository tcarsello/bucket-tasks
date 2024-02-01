const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { createUser, loginUser, deleteUser } = require('../controllers/userController.js')

const router = express.Router()

router.post('/login', loginUser)              // User log in
router.post('/register', createUser)          // Register a new user
router.delete('/delete', requireAuth, deleteUser)

module.exports = router
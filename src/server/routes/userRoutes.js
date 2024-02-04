const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { createUser, loginUser, deleteUser, patchUser, resetPassword } = require('../controllers/userController.js')

const router = express.Router()

router.post('/login', loginUser)              // User log in
router.post('/register', createUser)          // Register a new user
router.delete('/delete', requireAuth, deleteUser)
router.patch('/:userId', requireAuth, patchUser)
router.post('/reset/:userId', requireAuth, resetPassword)

module.exports = router
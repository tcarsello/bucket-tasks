const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { getAllLists, createList, updateList, deleteList, attachBucketToList, detachBucketFromList } = require('../controllers/listController.js')

const router = express.Router()

router.get('/getall/:userId', requireAuth, getAllLists)
router.post('/', requireAuth, createList)
router.patch('/:listId', requireAuth, updateList)
router.delete('/:listId', requireAuth, deleteList)

router.post('/:listId/attach', requireAuth, attachBucketToList)
router.post('/:listId/detach', requireAuth, detachBucketFromList)

module.exports = router
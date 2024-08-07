const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { getAllLists, createList, updateList, deleteList, attachBucketsToList, getListBuckets } = require('../controllers/listController.js')

const router = express.Router()

router.get('/getall/:userId', requireAuth, getAllLists)
router.post('/', requireAuth, createList)
router.patch('/:listId', requireAuth, updateList)
router.delete('/:listId', requireAuth, deleteList)

router.post('/:listId/attach', requireAuth, attachBucketsToList)
router.get('/:listId/buckets', requireAuth, getListBuckets)

module.exports = router
const Bucket = require('../models/bucketModel.js')
const User = require('../models/userModel.js')
const List = require('../models/listModel.js')
const ListEntry = require('../models/listEntryModel.js')

const { Op } = require('sequelize');

const getAllLists = async (req, res) => {
    try {

        const { userId } = req.params

        const user = await User.findOne({
            where: {
                userId: userId
            }
        })
        if (!user) throw "User not found"
        if (userId != req.user.userId) throw "You may only access your own data"

        const lists = await List.findAll({
            where: {
                ownerId: userId
            }
        })
        const numLists = lists.length

        res.status(200).json({lists, numLists})
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

const createList = async (req, res) => {
    try {

        const { userId, listName, description } = req.body

        if (!userId) throw "Must provide userId"
        if (!listName) throw "Must provide listName"

        const user = await User.findOne({
            where: {
                userId: userId
            }
        })
        if (!user) throw "User not found"
        if (userId != req.user.userId) throw "You may only access your own data"
        
        const list = await List.create({ownerId: userId, listName, description})
        const listJSON = list.toJSON()

        res.status(200).json(listJSON)
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

const updateList = async (req, res) => {
    try {

        const { listId } = req.params
        const { listName, description } = req.body

        const listOld = await List.findOne({
            where: {
                listId: listId,
                ownerId: req.user.userId
            }
        })
        if (!listOld) throw "List does not exist or does not belong to this user"

        await List.update(
            {listName, description},
            {
                where: {
                    listId: listId,
                    ownerId: req.user.userId
                }
            }
        )

        const list = await List.findOne({
            where: {
                listId: listId,
                ownerId: req.user.userId
            }
        })

        res.status(200).json({ list })

    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

const deleteList = async (req, res) => {
    try {

        const { listId } = req.params

        const list = await List.findOne({
            where: {
                listId,
                ownerId: req.user.userId
            }
        })

        if (!list) throw "List does not exist or does not belong to this user"

        await List.destroy({
            where:{
                listId
            }
        })

        res.status(200).json({ list })
    } catch (error) {
        console.log(error )
        res.status(400).json({error})
    }
}

const attachBucketsToList = async (req, res) => {

    try {

        const { listId } = req.params
        const { buckets } = req.body

        const list = await List.findOne({
            where: {
                listId,
                ownerId: req.user.userId
            }
        })

        if (!list) throw "List doe snot exist or does not belong to this user"
        
        await ListEntry.destroy({
            where: {
                listId: list.listId
            }
        })

        const bucketList = await Bucket.findAll({
            where: {
                ownerId: req.user.userId,
                bucketId: {
                    [Op.in]: buckets
                }
            }
        })

        bucketList.forEach(b => {
            const newentry = ListEntry.create({listId: list.listId, bucketId: b.bucketId})
        })

        res.status(200).json({bucketList})
    } catch (error) {
        res.status(400).json({error})
    }
}

const getListBuckets = async (req, res) => {
    try {

        const { listId } = req.params

        const list = await List.findOne({
            where: {
                listId,
                ownerId: req.user.userId
            }
        })

        if (!list) throw "List doe snot exist or does not belong to this user"
        
        const entries = await ListEntry.findAll({
            where: {
                listId: list.listId
            }
        })

        const bucketIds = entries.map(entry => entry.bucketId)

        const buckets = await Bucket.findAll({
            where: {
                bucketId: {
                    [Op.in]: bucketIds
                },
                ownerId: req.user.userId
            }
        })

        res.status(200).json({buckets})
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = { getAllLists, createList, updateList, deleteList, attachBucketsToList, getListBuckets }
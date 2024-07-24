const Bucket = require('../models/bucketModel.js')
const User = require('../models/userModel.js')
const List = require('../models/listModel.js')
const ListEntry = require('../models/listEntryModel.js')

const getAllLists = async (req, res) => {
    try {

        res.status(200).json()
    } catch (error) {
        res.status(400).json({error})
    }
}

const createList = async (req, res) => {
    try {

        res.status(200).json()
    } catch (error) {
        res.status(400).json({error})
    }
}

const updateList = async (req, res) => {
    try {

        res.status(200).json()
    } catch (error) {
        res.status(400).json({error})
    }
}

const deleteList = async (req, res) => {
    try {

        res.status(200).json()
    } catch (error) {
        res.status(400).json({error})
    }
}

const attachBucketToList = async (req, res) => {
    try {

        res.status(200).json()
    } catch (error) {
        res.status(400).json({error})
    }
}

const detachBucketFromList = async (req, res) => {
    try {

        res.status(200).json()
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = { getAllLists, createList, updateList, deleteList, attachBucketToList, detachBucketFromList }
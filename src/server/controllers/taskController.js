const Bucket = require('../models/bucketModel.js')
const User = require('../models/userModel.js')
const Task = require('../models/taskModel.js')

const CreateTask = async (req, res) => {
    try {

        const {bucketId, taskName, taskDescription} = req.body

        const task = await Task.create({bucketId, taskName, taskDescription})
        const taskJSON = task.toJSON()
        
        res.status(200).json(taskJSON)

    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = { CreateTask }
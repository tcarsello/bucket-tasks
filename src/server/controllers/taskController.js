const Bucket = require('../models/bucketModel.js')
const User = require('../models/userModel.js')
const Task = require('../models/taskModel.js')

const createTask = async (req, res) => {
    try {

        const {bucketId, taskName, taskDescription} = req.body

        const task = await Task.create({bucketId, taskName, taskDescription})
        const taskJSON = task.toJSON()
        
        res.status(200).json(taskJSON)

    } catch (error) {
        res.status(400).json({error})
    }
}

const getAllTasks = async (req, res) => {
    try {

        const { bucketId } = req.params

        const tasks = await Task.findAll({
            where: {
                bucketId
            }
        })

        res.status(200).json({
            count: tasks.length,
            tasks
        })

    } catch (error) {
        res.status(400).json({error})
    }
}

const updateTaskStatus = async (req, res) => {

    try {

        const { taskId } = req.params
        const { completed } = req.body

        const task = await Task.update(
            {completed},
            {
                where: {
                    taskId
                }
            }
        )

        res.status(200).json(task)

    } catch (error) {
        res.status(400).json({error})
    }

}

module.exports = { createTask, getAllTasks, updateTaskStatus }
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { Op, Sequelize } = require('sequelize')

const User = require('../models/userModel.js')
const Bucket = require('../models/bucketModel.js')
const Task = require('../models/taskModel.js')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, {expiresIn: '1d'})
}

const createUser = async (req, res) => {

    try {

        const {email, firstName, lastName, password} = req.body

        if (!email) throw "Email must be provided"
        if (!firstName) throw "First name must be provided"
        if (!lastName) throw "Last name must be provided"
        if (!password) throw "Password must be provided"

        if (password.length < 6) throw "Password is too short"
        
        const queryUser = await User.findOne({
            where: {
                email
            }
        })
        if (queryUser) throw "User with this email already exists"
        
        const salt = await bcrypt.genSalt(5)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = await User.create({ email, firstName, lastName, passwordHash })
        const userJSON = user.toJSON()
        
        const token = createToken(userJSON.userId)

        res.status(200).json({...user.dataValues, token})

    } catch (error) {
        res.status(400).json({error})
    }

}

const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body

        if (!email) throw "Email must be provided"
        if (!password) throw "Password must be provided"

        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) throw "User not found with that email address"
        const userJSON = user.toJSON()

        const match = await bcrypt.compare(password, userJSON.passwordHash)
        if (!match) throw "Incorrect password"

        const token = createToken(userJSON.userId)

        res.status(200).json({...user.dataValues, token})

    } catch (error) {
        res.status(400).json({error})
    }

}

const deleteUser = async (req, res) => {

    try {

        const { email } = req.body

        if (req.user.email != email) throw "Wrong user"

        const user = await User.destroy({
            where: {
                email
            }
        })

        res.status(200).json({message: 'User deleted'})

    } catch (error) {
        res.status(400).json({error})
    }

}

const patchUser = async (req, res) => {

    try {
        
        const { userId } = req.params
        const { email, firstName, lastName } = req.body

        if ( userId != req.user.userId) throw "Wrong user"
        
        await User.update(
            {email, firstName, lastName},
            {
                where: {
                    userId
                }
            }   
        )

        const user = await User.findOne({
            where: {
                userId
            }
        })
        if (!user) throw "Error finding user"
        const userJSON = user.toJSON()

        const token = createToken(userJSON.userId)
        res.status(200).json({...user.dataValues, token})

    } catch (error) {
        res.status(400).json({error})
    }

}

const resetPassword = async (req, res) => {

    try {

        const { userId } = req.params
        const { password } = req.body

        if (userId != req.user.userId) throw "Wrong user"

        if (!password) throw "New password must be provided"

        const salt = await bcrypt.genSalt(5)
        const passwordHash = await bcrypt.hash(password, salt)

        await User.update(
            {passwordHash},
            {
                where: {
                    userId
                }
            }
        )

        res.status(200).json({message: 'Password updated'})

    } catch (error) {
        res.status(400).json({error})
    }

}

const getUserDash = async (req, res) => {

    try {
        
        const { userId } = req.params

        if (userId != req.user.userId) throw "Wrong user"

        let numBuckets = 0;
        let numActiveBuckets;
        let numCompletedTasks;
        let numTotalTasks;
        let incompleteTasks;

        const buckets = await Bucket.findAll({
            where: {
                ownerId: userId
            }
        })
        numBuckets = buckets.length

        const activeBuckets = await Bucket.findAll({
            where: {
                ownerId: userId,
                bucketId: {
                    [Op.notIn]: Sequelize.col('Tasks.bucketId')
                }
            },
            include: [
                {
                    model: Task,
                    attributes: [],
                    required: true
                }
            ]
        })
        numActiveBuckets = activeBuckets.length

        const tasks = await Task.findAll({
            include: [
                {
                    model: Bucket,
                    where: {
                        ownerId: userId
                    },
                    include: [
                        {
                            model: User,
                            where: {
                                userId: userId
                            }
                        }
                    ]
                }
            ]
        })
        numTotalTasks = tasks.length

        incompleteTasks = await Task.findAll({
            include: [
                {
                    model: Bucket,
                    where: {
                        ownerId: userId
                    },
                    include: [
                        {
                            model: User,
                            where: {
                                userId: userId
                            }
                        }
                    ]
                }
            ],
            where: {
                completed: false
            }
        })
        numCompletedTasks = numTotalTasks - incompleteTasks.length

        res.status(200).json({numBuckets, numActiveBuckets, numCompletedTasks, numTotalTasks, incompleteTasks})

    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }

}

module.exports = { createUser, loginUser, deleteUser, patchUser, resetPassword, getUserDash}
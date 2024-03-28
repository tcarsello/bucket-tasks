const Bucket = require('../models/bucketModel.js')
const User = require('../models/userModel.js')

const getAllBuckets = async (req, res) => {

    try {

        const { userId } = req.params

        const user = await User.findOne({
            where: {
                userId: userId
            }
        })

        if (!user) throw "User does not exist"
        if (user.userId != req.user.userId) throw "You nay only access your own data"

        const buckets = await Bucket.findAll({
            where: {
                ownerId: user.userId
            }
        })

        res.status(200).json({
            count: buckets.length,
            buckets
        })

    } catch (error) {
        res.status(400).json({error})
    }

}

const createBucket = async (req, res) => {

    try {

        const {bucketName, description} = req.body

        const bucket = await Bucket.create({ ownerId: req.user.userId, bucketName, description })
        const bucketJSON = bucket.toJSON()

        res.status(200).json(bucketJSON)

    } catch (error) {
        res.status(400).json({error})
    }

}

const updateBucket = async (req, res) => {

    try {

        const {bucketName, description} = req.body
        const {bucketId} = req.params

        const bucketOld = await Bucket.findOne({
            where: {
                bucketId: bucketId,
                ownerId: req.user.userId
            }
        })
        if (!bucketOld) throw "Bucket does not exist or does not belong to this user"

        await Bucket.update(
            {bucketName, description},
            {
                where: {
                    bucketId: bucketId,
                    ownerId: req.user.userId
                }
            }
        )

        const bucket = await Bucket.findOne({
            where: {
                bucketId: bucketId,
                ownerId: req.user.userId
            }
        })

        res.status(200).json({bucket})

    } catch (error) {
        res.status(400).json({error})
    }

}

const deleteBucket = async (req, res) => {

    try {

        const {bucketId} = req.params

        const bucket = await Bucket.findOne({
            where: {
                bucketId,
                ownerId: req.user.userId
            }
        })

        if (!bucket) throw "Bucket does not exist or does not belong to this user"

        await Bucket.destroy({
            where:{
                bucketId
            }
        })

        res.status(200).json({bucket})

    } catch (error) {
        res.status(400).json({error})
    }

}

module.exports = { getAllBuckets, createBucket, updateBucket, deleteBucket }

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

module.exports = { getAllBuckets }

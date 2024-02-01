const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/userModel.js')

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

        res.status(200).json({user, token})

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

        res.status(200).json({user, token})

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

module.exports = { createUser, loginUser, deleteUser }
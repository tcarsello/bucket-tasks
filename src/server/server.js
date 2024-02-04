require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { connectToDB, sequelize } = require('./database.js')
const User = require('./models/userModel.js')
const Bucket = require('./models/bucketModel.js')

const userRoutes = require('./routes/userRoutes.js')
const bucketRoutes = require('./routes/bucketRoutes.js')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/bucket', bucketRoutes)

connectToDB().then(() => {

    sequelize.sync({force: false}).then(() => {
        
        console.log('Database synchronized')
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on port:', process.env.PORT)
        })

    }).catch((error) => {
        console.error('Failed to synchronize database')
        throw error
    })

}).catch(error => {
    console.error('Error occurred:', error)
})
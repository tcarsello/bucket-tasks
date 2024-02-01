require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.DB_HOST,
        dialect: 'mysql',
        port: process.DB_PORT
    }
)

const connectToDB = async () => {
    
    try {
        await sequelize.authenticate()
        console.log('Database connection has been established.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

}

module.exports = { connectToDB, sequelize }
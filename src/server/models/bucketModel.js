const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../database.js')

const { User } = require('./userModel.js')

const Bucket = sequelize.define('Bucket', {
    bucketId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userId'
        }
    },
    bucketName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'Buckets',
    timestamps: true
})

module.exports = Bucket
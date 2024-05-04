const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../database.js')

const { User } = require('./userModel.js')
const { Bucket } = require('./bucketModel.js')

const Task = sequelize.define('Task', {
    taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bucketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Buckets',
            key: 'bucketId'
        }
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDescription: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'Tasks',
    timestamps: true
})

module.exports = Task
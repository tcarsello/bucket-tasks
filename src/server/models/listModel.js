const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../database.js')

const Bucket = require('./bucketModel.js')
const User = require('./userModel.js')

const List = sequelize.define('List', {
    listId: {
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
    listName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Lists',
    timestamps: true
})

List.belongsTo(User, {foreignKey: 'ownerId'})
List.hasMany(Bucket, {})

module.exports = List
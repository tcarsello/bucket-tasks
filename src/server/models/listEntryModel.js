const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../database.js')

const List = require('./listModel.js')
const Bucket = require('./bucketModel.js')

const ListEntry = sequelize.define('ListEntry', {
    listEntryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Lists',
            key: 'listId'
        }
    },
    bucketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Buckets',
            key: 'bucketId'
        }
    }
}, {
    tableName: 'ListEntries',
    timestamps: true
})

List.hasMany(ListEntry, {foreignKey: 'listId', onDelete: 'CASCADE'})
Bucket.hasMany(ListEntry, {foreignKey: 'bucketId', onDelete: 'CASCADE'})

ListEntry.belongsTo(Bucket, {foreignKey: 'bucketId'})
ListEntry.belongsTo(List, {foreignKey: 'listId', onDelete: 'CASCADE'})

module.exports = ListEntry
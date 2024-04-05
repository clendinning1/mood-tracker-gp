const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User.js');

class MoodLog extends Model {}

MoodLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
    },
    {
        sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'MoodLog',
    }
);

module.exports = MoodLog;
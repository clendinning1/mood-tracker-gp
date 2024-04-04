const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./users.js');

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
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'mood_log',
    }
);

module.exports = MoodLog;
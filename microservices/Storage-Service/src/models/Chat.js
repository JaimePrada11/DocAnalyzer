const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Chat = sequelize.define('Chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    title: { type: DataTypes.STRING, defaultValue: 'Nuevo Chat' },
}, {
    tableName: 'chats',
    timestamps: true, 
    underscored: true
});

module.exports = Chat;
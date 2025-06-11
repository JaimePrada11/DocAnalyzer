const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Chat = require('./Chat');

const ChatMessage = sequelize.define('ChatMessage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chatId: { type: DataTypes.INTEGER, allowNull: false, field: 'chat_id' },
    sender: { type: DataTypes.STRING, allowNull: false }, 
    content: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'chat_messages',
    timestamps: true, 
    underscored: true 
});


Chat.hasMany(ChatMessage, { foreignKey: 'chat_id', as: 'messages' }); 
ChatMessage.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' }); 

module.exports = ChatMessage;
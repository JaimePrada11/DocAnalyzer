
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Document = sequelize.define('Document', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    document: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },

    fileName: { type: DataTypes.STRING, allowNull: false },
    fileType: { type: DataTypes.STRING, allowNull: false },
    fileSize: { type: DataTypes.INTEGER, allowNull: false },
    fileHash: { type: DataTypes.STRING, allowNull: false },
});



module.exports = Document;

const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password,{
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
    dialectOptions:{
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function connectDB() {
    try{
        await sequelize.authenticate();
        console.log('Conexion Exitosa')
    } catch( error){
        console.error('Error de Conexion:', error)
        process.exit(1)
    }
}

module.exports = { sequelize, connectDB };
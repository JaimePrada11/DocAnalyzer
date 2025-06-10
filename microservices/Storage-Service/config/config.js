require('dotenv').config();

const config = {
    app: {
        port: 3000,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        logging: false

    }
}

module.exports = config;
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

    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresIn: '1h',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
        refreshExpiresIn: '1d'
    }
}

module.exports = config;
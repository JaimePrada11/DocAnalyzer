const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateToken(user) {
    const payload = { id: user.id, role: user.role };

    const accessToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
    });

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiresIn
    });

    return { accessToken, refreshToken };
}

module.exports = generateToken;
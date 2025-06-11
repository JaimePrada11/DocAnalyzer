const axios = require('axios');
require('dotenv').config();

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const response = await axios.post(process.env.AUTH_SERVICE_URL, {}, {
      headers: { Authorization: token }
    });

    req.user = response.data.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido', error: err.message });
  }
}

module.exports = authMiddleware;

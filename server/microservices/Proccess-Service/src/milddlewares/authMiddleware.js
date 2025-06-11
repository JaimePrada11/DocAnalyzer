const axios = require('axios');
require('dotenv').config();

async function authMiddleware(req, res, next) {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = bearer.startsWith('Bearer ') ? bearer.split(' ')[1] : bearer;

  try {
    const response = await axios.post(process.env.AUTH_SERVICE_URL, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    req.user = response.data.user;
    next();
  } catch (err) {
    console.error('Error de autenticación:', err.message);
    return res.status(401).json({ message: 'Token inválido', error: err.message });
  }
}

module.exports = authMiddleware;

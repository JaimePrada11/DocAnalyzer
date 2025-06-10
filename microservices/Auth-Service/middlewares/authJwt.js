const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "No token proporcionado" });

  const token = authHeader.split(' ')[1]; // "Bearer token"

  if (!token) return res.status(401).json({ message: "Token malformado" });

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido o expirado" });

    req.user = user;  
    next();
  });
};

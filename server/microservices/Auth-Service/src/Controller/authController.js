const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const generateTokens = require('../utils/generateToken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const exists = await User.findOne({ where: { email } });

        if (exists) return res.status(400).json({ message: "Email ya registrado" });

        const user = await User.create({ name, email, password, role });
        const tokens = generateTokens(user);
        res.status(201).json({ user: { id: user.id, role: user.role }, ...tokens });

    } catch (error) {
        res.status(500).json({ message: "Error en registro", error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Email no encontrado" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

        const tokens = generateTokens(user);
        res.status(200).json({ user: { id: user.id, role: user.role }, ...tokens });


    } catch (error) {
        res.status(500).json({ message: "Error en login", error: error.message });
    }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Refresh token requerido" });

  try {
    const payload = jwt.verify(refreshToken, config.jwt.refreshSecret);
    const newAccessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Refresh token inválido o expirado" });
  }
};

exports.verify = (req, res) => {
    res.json({ message: 'Token válido', user: req.user });
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: [ 'name', 'email'] 
        });

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
};

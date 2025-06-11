const requester = require('../utils/requester');
require('dotenv').config();

exports.login = async (req, res) => {
  try {
    const response = await requester({
      method: 'post',
      url: `${process.env.AUTH_URL}/login`,
      data: req.body
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error en login' });
  }
};

exports.register = async (req, res) => {
  try {
    const response = await requester({
      method: 'post',
      url: `${process.env.AUTH_URL}/register`,
      data: req.body
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error en registro' });
  }
};

exports.verify = async (req, res) => {
  try {
    const response = await requester({
      method: 'post',
      url: `${process.env.AUTH_URL}/verify`,
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error en verificación' });
  }
};

exports.profile = async (req, res) => {
  try {
    const response = await requester({
      method: 'get',
      url: `${process.env.AUTH_URL}/profile`,
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error en perfil' });
  }
}
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
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error en login' });
  }
};

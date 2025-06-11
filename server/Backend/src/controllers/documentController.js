const requester = require('../utils/requester');
require('dotenv').config();

exports.createDocument = async (req, res) => {
  try {
    const response = await requester({
      method: 'post',
      url: `${process.env.DOCS_URL}/documents`,
      data: req.body,
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error al crear documento' });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const response = await requester({
      method: 'get',
      url: `${process.env.DOCS_URL}/documents`,
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error al obtener documentos' });
  }
};


exports.getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await requester({
      method: 'get',
      url: `${process.env.DOCS_URL}/documents/${id}`,
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { message: 'Error al obtener documento por ID' });
  }
};

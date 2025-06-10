const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.uploadFiles = async (req, res) => {
  try {
    const form = new FormData();

    for (const file of req.files) {
      form.append('files', file.buffer, file.originalname);
    }

    const response = await axios.post(`${process.env.GEMINI_URL}/upload`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('Error en gateway:', err.message);
    res.status(500).json({ message: 'Error reenviando archivos al microservicio' });
  }
};

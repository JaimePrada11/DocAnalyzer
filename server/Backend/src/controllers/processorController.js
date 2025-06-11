const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const requester = require('../utils/requester');

exports.uploadFiles = async (req, res) => {
  try {
    const form = new FormData();

    for (const file of req.files) {
      form.append('files', file.buffer, file.originalname);
    }

    const response = await axios.post(`${process.env.GEMINI_URL}`, form, {
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

exports.askGemini = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.GEMINI_URL}/ask`, {
      params: req.body
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error en gateway:', err.message);
    res.status(500).json({ message: 'Error reenviando peticiones al microservicio' });
  }

}

exports.uploadAndSaveDocuments = async (req, res) => {
  try {
    const form = new FormData();
    for (const file of req.files) {
      form.append('files', file.buffer, file.originalname);
    }

    const geminiResponse = await axios.post(`${process.env.GEMINI_URL}`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    const results = geminiResponse.data;

    if (!Array.isArray(results)) {
      return res.status(500).json({ message: 'Respuesta inesperada del microservicio de procesamiento.' });
    }

    const savedResults = await Promise.all(results.map(async (item) => {
      if (item.error) {
        return {
          archivo: item.archivo.nombre_original,
          status: 'error',
          detalle: item.error
        };
      }

      const datos = item.datos_extraidos;
      const meta = item.archivo;

      const payload = {
        name: datos.Nombre || 'N/A',
        document: datos.Documento || 'N/A',
        location: datos.Ubicación || 'N/A',
        summary: datos.Resumen || 'N/A',
        email: datos.Correo !== 'N/A' ? datos.Correo : null,
        phone: datos.Teléfono !== 'N/A' ? datos.Teléfono : null,
        fileName: meta.nombre_original,
        fileType: meta.mime_type,
        fileSize: meta.tamaño,
        fileHash: meta.hash,
      };

      try {
        const saveResponse = await requester({
          method: 'post',
          url: `${process.env.DOCS_URL}/documents`,
          data: payload,
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization, 
          },
        });

        return {
          document: saveResponse.data.document,

        };

      } catch (error) {
        console.error('Error al guardar documento:', error.message);
        return {
          archivo: meta.nombre_original,
          status: 'error',
          detalle: error.response?.data || error.message
        };
      }
    }));

    res.json({ resultados: savedResults });

  } catch (err) {
    console.error('Error en uploadAndSaveDocuments:', err.message);
    res.status(500).json({ message: 'Error procesando archivos.' });
  }
};

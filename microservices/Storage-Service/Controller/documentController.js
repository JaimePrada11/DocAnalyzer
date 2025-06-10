const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
  const { name, document, location, summary } = req.body;
  const userId = req.user.id;

  try {
    const newDocument = await Document.create({ name, document, location, summary, userId });
    res.status(201).json({ message: 'Documento guardado', newDocument });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar', error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? {}
      : { where: { userId: req.user.id } };

    const documents = await Document.findAll(query);
    res.json({ documents });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener documentos', error: err.message });
  }
};

const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
  try {
    const {
      name,
      document,
      location,
      summary,
      email,
      phone,
      fileName,
      fileType,
      fileSize,
      fileHash
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const userId = req.user.id;

    if (!name || !document || !location || !summary || !fileName || !fileType || !fileSize || !fileHash) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newDocument = await Document.create({
      name,
      document,
      location,
      summary,
      email: email || null,
      phone: phone || null,
      fileName,
      fileType,
      fileSize,
      fileHash,
      userId
    });

    res.status(201).json({ message: 'Documento guardado exitosamente', document: newDocument });
  } catch (err) {
    console.error('Error al guardar documento:', err);
    res.status(500).json({ message: 'Error al guardar documento', error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const query = req.user.role === 'admin'
      ? {}
      : { where: { userId: req.user.id } };

    const documents = await Document.findAll(query);

    res.json({ documents });
  } catch (err) {
    console.error('Error al obtener documentos:', err);
    res.status(500).json({ message: 'Error al obtener documentos', error: err.message });
  }
};


exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    if (req.user.role !== 'admin' && document.userId !== req.user.id) {
      return res.status(403).json({ message: 'No tiene permiso para ver este documento' });
    }

    res.json({ document });
  } catch (err) {
    console.error('Error al obtener documento:', err);
    res.status(500).json({ message: 'Error al obtener documento', error: err.message });
  }
};

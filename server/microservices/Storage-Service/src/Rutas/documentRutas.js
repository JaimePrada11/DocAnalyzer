const express = require('express');
const router = express.Router();
const controller = require('../Controller/documentController');
const auth = require('../middlewares/authMiddleware');

router.post('/documents', auth, controller.createDocument);
router.get('/documents',auth, controller.getDocuments);
router.get('/documents/:id',auth, controller.getDocumentById);


module.exports = router;

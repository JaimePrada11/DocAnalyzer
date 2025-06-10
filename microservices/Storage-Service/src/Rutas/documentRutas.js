const express = require('express');
const router = express.Router();
const controller = require('../Controller/documentController');
const auth = require('../middlewares/authMiddleware');

router.post('/documents', controller.createDocument);
router.get('/documents', controller.getDocuments);

module.exports = router;

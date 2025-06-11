const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', controller.createDocument);
router.get('/', controller.getDocuments);

module.exports = router;

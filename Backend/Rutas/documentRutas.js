const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, controller.createDocument);
router.get('/', verifyToken, controller.getDocuments);

module.exports = router;

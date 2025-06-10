const express = require('express');
const router = express.Router();
const controller = require('../Controller/documentController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.createDocument);
router.get('/', auth, controller.getDocuments);

module.exports = router;

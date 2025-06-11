const express = require('express');
const router = express.Router();
const controller = require('../controllers/processorController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const verifyToken = require('../middlewares/verifyToken');

router.post('/', upload.array('files'), controller.uploadAndSaveDocuments);
router.post('/post', upload.array('files'), controller.uploadFiles);

module.exports = router;

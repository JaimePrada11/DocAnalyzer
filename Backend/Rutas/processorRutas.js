const express = require('express');
const router = express.Router();
const controller = require('../controllers/processorController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.array('files'), controller.uploadFiles);

module.exports = router;

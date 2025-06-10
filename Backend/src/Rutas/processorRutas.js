const express = require('express');
const router = express.Router();
const controller = require('../controllers/processorController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.array('files'), controller.uploadFiles);
router.post('/ask', upload.array('files'), controller.askGemini);


module.exports = router;

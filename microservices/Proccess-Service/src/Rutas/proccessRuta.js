const express = require('express');
const multer = require('multer');
const { handleMultipleFiles, askGemini, getChatResponse } = require('../Controller/processorController');
const auth = require('../milddlewares/authMiddleware');


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.array('files'), handleMultipleFiles);
router.post('/ask', upload.array('files'), askGemini);
router.post('/getChatResponse', auth, getChatResponse);

module.exports = router;

const express = require('express');
const multer = require('multer');
const {
  handleMultipleFiles,
  askGemini
} = require('../Controller/processorController');
const auth = require('../milddlewares/authMiddleware');


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.array('files'), handleMultipleFiles);
router.post('/ask', auth, upload.array('files'), askGemini);

module.exports = router;

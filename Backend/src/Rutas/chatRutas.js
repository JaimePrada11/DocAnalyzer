const express = require('express');
const router = express.Router();
const controller = require('../controllers/chatController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/new', verifyToken, controller.createChat);
router.get('/', verifyToken, controller.getChats);
router.get('/:chatId/message', verifyToken, controller.getMessages);
router.post('/:chatId/message', verifyToken, controller.sendMessages);

module.exports = router;

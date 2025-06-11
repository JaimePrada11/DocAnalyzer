const express = require('express');
const router = express.Router();
const chatController = require('../Controller/chatController');
const auth = require('../middlewares/authMiddleware');

router.post('/chats', chatController.createChat);
router.get('/chats/user/:userId', chatController.getChatsByUserId); 
router.get('/chats/:chatId/messages', chatController.getChatMessages);
router.post('/chats/:chatId/messages', chatController.addChatMessage);

module.exports = router;

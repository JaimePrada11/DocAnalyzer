const requester = require('../utils/requester');
require('dotenv').config();

exports.createChat = async (req, res) => {
    try {
        const response = await requester({
            method: 'post',
            url: `${process.env.DOCS_URL}/chats`,
            data: req.body,
            headers: { Authorization: req.headers.authorization }
        });
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error al crear documento' });
    }
};

exports.getChats = async (req, res) => {
    try {
        const response = await requester({
            method: 'get',
            url: `${process.env.DOCS_URL}/chats/user/${req.userId}`,
            headers: { Authorization: req.headers.authorization }
        });
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error al obtener chats' });
    }
}

exports.getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        const response = await requester({
            method: 'get',
            url: `${process.env.DOCS_URL}/chats/${chatId}/messages`,
            headers: { Authorization: req.headers.authorization }
        });
        res.json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error al obtener mensajes' });
    }
}

exports.sendMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { userMessage, sender } = req.body; 

        if (!chatId || isNaN(parseInt(chatId))) {
            return res.status(400).json({ message: 'El ID del chat proporcionado es inválido.' });
        }
        if (!userMessage) {
            return res.status(400).json({ message: 'El contenido del mensaje es requerido.' });
        }
        if (!sender) {
            return res.status(400).json({ message: 'El remitente del mensaje es requerido (ej. "user" o "model").' });
        }

        const userMessageStoreResponse = await requester({
            method: 'post',
            url: `${process.env.DOCS_URL}/chats/${chatId}/messages`,
            headers: { Authorization: req.headers.authorization },
            data: {
                sender: sender,
                content: userMessage 
            }
        });


        const chatHistoryResponse = await requester({
            method: 'get',
            url: `${process.env.DOCS_URL}/chats/${chatId}/messages`,
            headers: { Authorization: req.headers.authorization }
        });
        const chatHistory = chatHistoryResponse.data.map(msg => ({
            sender: msg.sender, 
            content: msg.content
        }));

        const geminiAiResponse = await requester({
            method: 'post',
            url: `${process.env.AI_SERVICE_URL}/getChatResponse`, 
            headers: { Authorization: req.headers.authorization },
            data: {
                userMessage: userMessage, 
                chatHistory: chatHistory 
            }
        });
        const geminiReplyContent = geminiAiResponse.data.respuestaGemini; 

        await requester({
            method: 'post',
            url: `${process.env.DOCS_URL}/chats/${chatId}/messages`,
            headers: { Authorization: req.headers.authorization },
            data: {
                sender: 'model', 
                content: geminiReplyContent
            }
        });

        res.status(200).json({ reply: geminiReplyContent }); 
    } catch (err) {
        console.error('Error al enviar mensaje y obtener respuesta de Gemini:', err.message, err.response?.data);
        res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error interno del servidor al procesar el mensaje.' });
    }
};
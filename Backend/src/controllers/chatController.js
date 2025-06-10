const requester = require('../utils/requester');
require('dotenv').config();

exports.createChat = async (req, res) => {
    try {
        const response = await requester({
            method: 'post',
            url: `${process.env.DOCS_URL}/chat`,
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
            url: `${process.env.DOCS_URL}/chat/${req.userId}`,
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
            url: `${process.env.DOCS_URL}/chat/${chatId}/messages`,
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
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: 'El mensaje es requerido' });

        const chatHistorialResponse = await requester({
            method: 'get',
            url: `${process.env.DOCS_URL}/chat/${chatId}/messages`,
            headers: { Authorization: req.headers.authorization }
        });
        const chatHistorial = chatHistorialResponse.data;

        const geminiResponse = await requester({
            method: 'post',
            url: `${process.env.DOCS_URL}/chat/${chatId}/messages`,
            headers: { Authorization: req.headers.authorization },
            data: { message }
        });
        const gemini = geminiResponse.data;

        await requester({
            method: 'post',
            url: `${process.env.DOCS_URL}/chat/${chatId}/messages`,
            headers: { Authorization: req.headers.authorization },
            data: { message: `@${req.userId} ${gemini.message}` }
        });

        res.status(200).json({ reply: gemini})

    } catch (err) {
        res.status(err.response?.status || 500).json(err.response?.data || { message: 'Error al enviar mensaje' });
    }
}
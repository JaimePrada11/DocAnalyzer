const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');

exports.createChat = async (req, res) => { 
    try {
        const { userId, title } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'El ID de usuario es obligatorio para crear un chat.' });
        }
        const newChat = await Chat.create({ userId, title });
        res.status(201).json({ message: '¡Chat creado exitosamente!', chatId: newChat.id });
    } catch (error) {
        console.error('Error al crear el chat:', error);
        res.status(500).json({ message: 'No se pudo crear el chat. Por favor, inténtalo de nuevo.' });
    }
}; 

exports.getChatsByUserId = async (req, res) => { 
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: 'El ID de usuario en la URL es obligatorio.' });
        }
        const chats = await Chat.findAll({
            where: { userId },
            order: [['updatedAt', 'DESC']]
        });
        res.status(200).json(chats);
    } catch (error) {
        console.error('Error al obtener los chats por ID de usuario:', error);
        res.status(500).json({ message: 'No se pudieron recuperar los chats. Por favor, inténtalo de nuevo.' });
    }
};

exports.getChatMessages = async (req, res) => { 
    try {
        const { chatId } = req.params;

        if (!chatId || isNaN(parseInt(chatId))) {
            return res.status(400).json({ message: 'El ID del chat en la URL es inválido.' });
        }
        const messages = await ChatMessage.findAll({
            where: { chatId },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener los mensajes del chat:', error);
        res.status(500).json({ message: 'No se pudieron recuperar los mensajes del chat. Por favor, inténtalo de nuevo.' });
    }
};

exports.addChatMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { sender, content } = req.body;

        if (!chatId || isNaN(parseInt(chatId)) || !sender || !content) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para el mensaje (ID de chat, remitente o contenido).' });
        }

        const newChatMessage = await ChatMessage.create({ chatId, sender, content });

        await Chat.update({ updatedAt: new Date() }, { where: { id: chatId } });

        res.status(201).json({ message: '¡Mensaje añadido exitosamente!', messageId: newChatMessage.id });
    } catch (error) {
        console.error('Error al añadir mensaje al chat:', error);
        res.status(500).json({ message: 'No se pudo añadir el mensaje al chat. Por favor, inténtalo de nuevo.' });
    }
};
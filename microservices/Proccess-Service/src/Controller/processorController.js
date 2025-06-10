const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI('AIzaSyAHTeKpvd5dDDX7uYQsFCa_R8fKlcdX0Tg');

const extractTextFromFile = async (buffer, mimetype) => {
    if (mimetype === 'application/pdf') {
        const data = await pdfParse(buffer);
        return data.text;
    }

    if (mimetype === 'text/plain') {
        return buffer.toString('utf-8');
    }

    if (mimetype.startsWith('image/')) {
        return '[Imagen cargada: el análisis de texto no está soportado para imágenes en este flujo. Por favor, sube un PDF o TXT.]';
    }

    return '[Tipo de archivo no soportado. Por favor, sube un PDF o TXT.]';
};

const getGeminiResponse = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
};

const parseJsonFromResponse = (responseText) => {
    const cleanText = responseText.trim()
        .replace(/^```json/i, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

    try {
        return JSON.parse(cleanText);
    } catch (error) {
        console.error('Error al parsear JSON de la respuesta de Gemini:', error);
        return null;
    }
};

const handleMultipleFiles = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No se han subido archivos.' });
        }

        const results = await Promise.all(req.files.map(async (file) => {
            const text = await extractTextFromFile(file.buffer, file.mimetype);

            const prompt = `
Analiza el siguiente documento y responde exclusivamente en un JSON válido con las claves:
{
  "Nombre": "Nombre de la persona o entidad principal en el documento",
  "Documento": "Tipo y número de documento (ej. Cédula 123456789) si aplica, o 'N/A'",
  "Ubicación": "Ubicación relevante (ciudad, país) mencionada en el documento, o 'N/A'",
  "Puntos_clave": ["punto clave 1", "punto clave 2", "...", "máximo 5 puntos clave"],
  "Resumen": "Un resumen conciso y claro del documento (máximo 100 palabras)"
}

Asegúrate de que la salida sea *solo* el objeto JSON, sin texto adicional antes o después. Si no encuentras información para una clave, usa "N/A" para cadenas o un array vacío para "Puntos_clave".

DOCUMENTO:
${text}
`;

            const rawResponse = await getGeminiResponse(prompt);
            const json = parseJsonFromResponse(rawResponse);

            return json
                ? { archivo: file.originalname, ...json }
                : {
                    archivo: file.originalname,
                    error: 'La respuesta de Gemini no es un JSON válido o no sigue la estructura esperada.',
                    contenidoRecibido: rawResponse,
                };
        }));

        res.json(results);
    } catch (err) {
        console.error('Error procesando archivos:', err);
        res.status(500).json({ error: 'Ocurrió un error interno al procesar los archivos o al conectar con Gemini. Por favor, inténtalo de nuevo más tarde.' });
    }
};

const askGemini = async (req, res) => {
    try {
        const { prompt: userPrompt } = req.body; 

        if (!userPrompt) {
            return res.status(400).json({ error: 'El mensaje (prompt) es obligatorio para esta solicitud.' });
        }

        let contextText = '';

        if (req.files?.length) {
            for (const file of req.files) {
                const content = await extractTextFromFile(file.buffer, file.mimetype);
                contextText += `\nContenido del archivo "${file.originalname}":\n${content}\n`;
            }
        }

        const fullPrompt = contextText
            ? `${userPrompt}\n\nArchivos adjuntos para contexto:\n${contextText}`
            : userPrompt;

        const respuesta = await getGeminiResponse(fullPrompt);

        res.json({ mensajeOriginal: userPrompt, respuestaGemini: respuesta });
    } catch (error) {
        console.error('Error en la solicitud personalizada a Gemini (/ask):', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar tu solicitud o al interactuar con Gemini. Por favor, verifica el prompt e inténtalo de nuevo.' });
    }
};

const getChatResponse = async (userMessage, chatHistory = []) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const formattedHistory = chatHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        const reply = response.text();

        return reply;

    } catch (error) {
        console.error('Error al obtener respuesta del chat de Gemini:', error);
        const err = new Error('No se pudo obtener una respuesta del chat de Gemini. Por favor, inténtalo de nuevo.');
        err.status = 500;
        throw err;
    }
};

module.exports = {
    handleMultipleFiles,
    askGemini,
    getChatResponse
};
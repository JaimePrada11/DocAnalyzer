const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractTextFromFile = async (buffer, mimetype) => {
    if (mimetype === 'application/pdf') {
        const data = await pdfParse(buffer);
        return data.text;
    }

    if (mimetype === 'text/plain') {
        return buffer.toString('utf-8');
    }

    if (mimetype.startsWith('image/')) {
        return '[Imagen cargada: análisis no soportado en este flujo]';
    }

    return '[Tipo de archivo no soportado]';
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
    } catch {
        return null;
    }
};

const handleMultipleFiles = async (req, res) => {
    try {
        const results = await Promise.all(req.files.map(async (file) => {
            const text = await extractTextFromFile(file.buffer, file.mimetype);

            const prompt = `
Analiza el siguiente documento y responde exclusivamente en JSON válido con las claves:
{
  "Nombre": "",
  "Documento": "",
  "Ubicación": "",
  "Puntos clave": ["punto 1", "punto 2", "..."],
  "Resumen": ""
}

DOCUMENTO:
${text}
      `;

            const rawResponse = await getGeminiResponse(prompt);
            const json = parseJsonFromResponse(rawResponse);

            return json
                ? { archivo: file.originalname, ...json }
                : {
                    archivo: file.originalname,
                    error: 'Respuesta inválida o no estructurada como JSON',
                    contenidoRecibido: rawResponse,
                };
        }));

        res.json(results);
    } catch (err) {
        console.error('Error procesando archivos:', err);
        res.status(500).json({ error: 'Ocurrió un error al procesar los archivos o conectar con Gemini' });
    }
};

const askGemini = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'El prompt es obligatorio.' });
        }

        let contextText = '';

        if (req.files?.length) {
            for (const file of req.files) {
                const content = await extractTextFromFile(file.buffer, file.mimetype);
                contextText += `\nContenido del archivo "${file.originalname}":\n${content}\n`;
            }
        }

        const fullPrompt = contextText ? `${prompt}\n\nArchivos adjuntos:\n${contextText}` : prompt;
        const respuesta = await getGeminiResponse(fullPrompt);

        res.json({ prompt, respuestaGemini: respuesta });
    } catch (error) {
        console.error('Error en /ask:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar el prompt personalizado' });
    }
};

module.exports = {
    handleMultipleFiles,
    askGemini,
};

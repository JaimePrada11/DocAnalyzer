require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent("¿Cuál es la capital de Francia?");
    const response = await result.response;
    console.log("Respuesta de Gemini:\n", response.text());
  } catch (error) {
    console.error("Error al llamar a Gemini:", error.message);
  }
}

testGemini();

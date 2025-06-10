require('dotenv').config();
const express = require('express');
const app = express();

const authRoutes = require('./Rutas/authRutas');
const documentRoutes = require('./Rutas/documentRutas');
const geminiRoutes = require('./Rutas/processorRutas');


app.use('/auth', authRoutes);
app.use('/documents', documentRoutes);
app.use('/gemini', geminiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway corriendo en http://localhost:${PORT}`);
});

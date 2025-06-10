require('dotenv').config();
const express = require('express');
const app = express();

const authRoutes = require('./src/Rutas/authRutas');
const documentRoutes = require('./src/Rutas/documentRutas');
const chatRoutes = require('./src/Rutas/chatRutas');


app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);

app.get('/api/status', (req, res) =>{
    res.json({ message: 'Server is running'});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gateway corriendo en http://localhost:${PORT}`);
});

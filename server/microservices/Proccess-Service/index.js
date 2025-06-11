const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const processRoutes = require('./src/Rutas/proccessRuta');

const app = express();
const PORT = 6001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/proccess', processRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

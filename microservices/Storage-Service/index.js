const express = require('express');
const documentRoutes = require('./Rutas/documentRutas');
const { sequelize } = require('./config/database');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/documents', documentRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(
    (err) => {
        console.error('Error al conectar a la base de datos:', err);
    }
)

const express = require('express');
const documentRoutes = require('./src/Rutas/documentRutas');
const chatRoutes = require('./src/Rutas/chatRutas');
const { sequelize } = require('./src/config/database');


require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/', documentRoutes);
app.use('/', chatRoutes )

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

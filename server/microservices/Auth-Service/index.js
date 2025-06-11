const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/config/database');
const Auth = require('./src/Rutas/authRutas')

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', Auth);

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

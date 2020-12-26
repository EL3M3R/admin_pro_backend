require('dotenv').config(); //variables de entorno

const express = require('express');
const cors = require('cors');

const { db_connection } = require('./database/config')

//crear el servidor express
const app = express();
//configurar CORS
app.use(cors());
//lectura y parseo de body
app.use(express.json())
//DB connection
db_connection();

//Directorio Publico
app.use( express.static('public') )

//Rutas  
app.use('/api/adminPro/upload', require('./routes/uploadRouter'));
app.use('/api/adminPro/todo', require('./routes/busquedas'));
app.use('/api/adminPro/medicos', require('./routes/medicosRouter'));
app.use('/api/adminPro/hospitales', require('./routes/hospitalesRouter'));
app.use('/api/adminPro/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, (() => {
    console.log("servidor corriendo en port", process.env.PORT)
})) 
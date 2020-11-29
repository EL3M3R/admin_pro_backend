require('dotenv').config(); //variables de entorno

const express = require('express');
const cors = require('cors');

const {db_connection} =  require('./database/config')

//crear el servidor express
    const app =   express();
//configurar CORS
    app.use(cors());
//lectura y parseo de body
app.use(express.json())
//DB connection
    db_connection();
//Rutas  
app.use('/api/adminPro/usuarios' , require('./routes/usuariosRoutes'));
app.use('/api/login' , require('./routes/auth'));


app.listen(process.env.PORT , ( () => {
        console.log("servidor corriendo en port"  , process.env.PORT)
})) 
require('dotenv').config(); //variables de entorno

const express = require('express');
const cors = require('cors');

const {db_connection} =  require('./database/config')

//crear el servidor express
    const app =   express();
//configurar CORS
    app.use(cors());
//DB connection
    db_connection();

    app.get('/', (req , resp) =>{
        resp.json({
            ok:true,
            msg: 'Hola Mundo'
        })
    })


    app.listen(process.env.PORT , ( () => {
        console.log("servidor corriendo en port"  , process.env.PORT)
    })) 
const {response} = require('express')
const Usuario = require('../models/usuarios.model');

const  bcrypt  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login =  async(req , resp = response)=>{    
    const {email , password} = req.body;
    try {
        const usuarioDB = await Usuario.findOne({email})

        if( !usuarioDB ){
            return resp.status(404).json({
                ok:false,
                msg:'Email no valido'
            })
        }

        // veerificar contraseña

        const validPassword =  bcrypt.compareSync(password , usuarioDB.password)

        if(!validPassword){
            return resp.status(400).json({
                ok:false,
                msg:'Contraseña no valida'
            })
        }

        //Generar un toekn

        const token = await  generarJWT(usuarioDB.id);

        resp.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado login'
        })
    }
}

module.exports = {
    login
}
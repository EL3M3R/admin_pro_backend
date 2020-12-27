const { response } = require('express')
const Usuario = require('../models/usuarios.model');

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, resp = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email })

        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        // veerificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar un toekn

        const token = await generarJWT(usuarioDB.id);

        resp.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado login'
        })
    }
}

const loginGoogle = async (req, resp = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const UsuarioDB = Usuario.findOne({ email });
        let usuario;

        if (!UsuarioDB) {
            //no existe el usuario
            usuario = new Usuario({
                nombre: name,
                password: '',
                email,
                img: picture,
                google: true
            })
        } else {
            usuario = UsuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        //Generar un toekn

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token

        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token no valido',
            error
        })
    }

}


const renewToken = async( req  , res = response) => {

    const uid = req.uid;
     //Generar un toekn
     const token = await generarJWT(uid);


    res.json({
        ok:true,
         token
    })
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}
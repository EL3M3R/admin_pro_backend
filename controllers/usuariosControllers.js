const Usuario = require('../models/usuarios.model')
const { response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

getUsuarios = async (req, resp) => {

    const desde = Number(req.query.desde || 0);

    console.log("desde" , desde)

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ])

    console.log("USUARIOS" , usuarios);


    resp.json({
        ok: true,
        usuarios,
        total,
    });
}

crearUsuarios = async (req, resp = response) => {
    const { email, nombre, password } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado..'
            })
        }
        const usuario = new Usuario(req.body)
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar password
        await usuario.save();

        const token = await generarJWT(usuario.id);

        resp.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado..!'
        })
    }
}

actualizarUsuario = async (req, resp = response) => {
    try {

        const uid = req.params.id;
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }


        //Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = Usuario.findOne(email);
            if (existeEmail) {
                return resp.status(500).json({
                    ok: false,
                    msg: 'Ya hay un usuario con ese email'
                })
            }
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        resp.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

borrarUsuario = async (req, resp = response) => {

    try {
        const uid = req.params.id;

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        resp.status(200).json({
            ok: true,
            msg: `El usuario ${usuarioDB.nombre} fue eliminado`
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar al usuario'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}
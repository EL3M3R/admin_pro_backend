
const { response } = require('express')
const Usuario = require('../models/usuarios.model')
const Medicos = require('../models/medicos')
const Hospital = require('../models/hospital')

const getBusquedaTotal = async (req, res = response) => {

    const paramRoute = req.params.busqueda || 'SinBusqueda';
    const regExp = new RegExp(paramRoute, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regExp, email: regExp }),
        Medicos.find({ nombre: regExp }),
        Hospital.find({ nombre: regExp }),
    ])

    res.status(200).json({
        ok: true,
        msg: 'El parametro es : ' + paramRoute,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async (req, res = response) => {
    const tabla = req.params.tabla;
    const paramRoute = req.params.busqueda || 'SinBusqueda';
    const regExp = new RegExp(paramRoute, 'i');

    let data = [];
    switch (tabla) {
        case 'medico':
            data = await Medicos.find({ nombre: regExp })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
            break;

        case 'hospital':
            data = await Hospital.find({ nombre: regExp })
                .populate('usuario', 'nombre img')
 
            break;

        case 'usuario':
            data = await Usuario.find({ nombre: regExp, email: regExp })
            break;

        default:
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'La tabla no es correcta'
                }
            );

    }


    res.json({
        ok: true,
        resultados: data
    })
}


module.exports = {
    getBusquedaTotal,
    getDocumentosColeccion
}
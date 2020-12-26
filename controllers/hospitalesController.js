const { response } = require('express')
const Hospital = require('../models/hospital')

const getHospitales = async(req, res = response) => {
    const hospitales = await Hospital.find()
                                            .populate('usuario' , 'nombre email img');

    res.json({
        ok: true,
             hospitales
    })
}
 


const crearHospitales = async(req, res = response) => {

    const uid  = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body});

    try {

      const hospitalGuardado = await hospital.save();



        res.json({
            ok: true,
            hospital: hospitalGuardado
        })

    } catch (error) {
        console.log("error" , error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado el mensaje es :' + error
        })
    }

  
}

const ActualizarHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'ActualizarHospitales'
    })
}

const BorrarzarHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'BorrarzarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    ActualizarHospitales,
    BorrarzarHospitales
}
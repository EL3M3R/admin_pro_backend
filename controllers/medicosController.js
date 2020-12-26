const { response} = require('express')

const Medicos = require('../models/medicos')


const getMedicos = async(req , res = response) =>{

    const medicos = await Medicos.find()
                                        .populate('usuario' , 'nombre img email')
                                        .populate('hospital' , 'nombre img');

    res.json({
        ok:true,
      medicos
    })
}


const  crearMedicos = async(req , res = response) =>{

    const uid = req.uid;
    const medicos = new Medicos({
        usuario:uid,
        ...req.body
    })
    try {

        const usuarioGuardar = await medicos.save()
        res.json({
            ok:true,
            usuario:usuarioGuardar
        })
    } catch (error) {
        console.log("error" , error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado el mensaje es :' + error
        })
    }
 
}

const  actualizarMedicos = (req , res = response) =>{
    res.json({
        ok:true,
        msg:'actualizarMedicos'
    })
}

const  BorrarzarMedicos = (req , res = response) =>{
    res.json({
        ok:true,
        msg:'BorrarzarMedicos'
    })
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    BorrarzarMedicos
}
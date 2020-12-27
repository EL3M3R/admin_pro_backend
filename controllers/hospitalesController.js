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

const ActualizarHospitales = async(req, res = response) => {
   
    const id = req.params.id; 
    const uid = req.uid;
    try {   
        
        const hospital = await Hospital.findById(id);

        if(!hospital){
           return  res.status(404).json({
                ok: false,
                msg: 'El hos´pital no existe' 
            })
        }

        const cambiosHospital = {
            ...req.boy,
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id , cambiosHospital, {new:true});

        res.json({
            ok: true,
            hospital:hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'ActualizarHospitales Error: ' + error 
        })
    }
   
}

const BorrarzarHospitales = async(req, res = response) => {

 
    const id = req.params.id; 
    const uid = req.uid;
    try {    
        
        const hospital = await Hospital.findById(id);

        if(!hospital){
           return  res.status(404).json({
                ok: false,
                msg: 'El hos´pital no existe' 
            })
        }

        await Hospital.findByIdAndDelete(id);
¿
        res.json({
            ok: true,
          msg:'Hospital eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'ActualizarHospitales Error: ' + error 
        })
    }
   
}
}

module.exports = {
    getHospitales,
    crearHospitales,
    ActualizarHospitales,
    BorrarzarHospitales
}
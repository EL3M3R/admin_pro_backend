const { response } = require('express')

const Medicos = require('../models/medicos')


const getMedicos = async (req, res = response) => {

    const medicos = await Medicos.find()
        .populate('usuario', 'nombre img email')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })
}


const crearMedicos = async (req, res = response) => {

    const uid = req.uid;
    const medicos = new Medicos({
        usuario: uid,
        ...req.body
    })
    try {

        const usuarioGuardar = await medicos.save()
        res.json({
            ok: true,
            usuario: usuarioGuardar
        })
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado el mensaje es :' + error
        })
    }

}

const actualizarMedicos = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;


    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'El medico no existe'
            })
        }

        const cambiosMedico = {
            ...req.boy,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Meidco Actualizar Error: ' + error
        })
    }
}

const BorrarzarMedicos = async(req, res = response) => {
    const id = req.params.id;
    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'El medico no existe'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Meidco Eliminar Error: ' + error
        })
    }
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    BorrarzarMedicos
}
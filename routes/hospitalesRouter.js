/**
 * Ruta: /api/adminPro/hospitales
 */
const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospitales,
    ActualizarHospitales,
    BorrarzarHospitales
} = require('../controllers/hospitalesController')

router.get('/',   getHospitales);
router.post('/registroHospital',
    [
        validarJWT,
        check('nombre' , 'El campo nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospitales);

router.put('/:id',
    [],
    ActualizarHospitales);

router.delete('/:id',  BorrarzarHospitales);

module.exports = router;
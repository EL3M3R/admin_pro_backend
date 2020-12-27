/**
 * Ruta: /api/adminPro/hospitales
 */
const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Metodos del controlador
const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    BorrarzarMedicos
} = require('../controllers/medicosController')

//Obtener Medicos
router.get('/', getMedicos);

//Registrar Medicos
router.post('/registroMedicos',
    [validarJWT,
        check('nombre', 'El campo nombre del Medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos],
    crearMedicos);

//Actualizar Medicos
router.put('/:id',
    [validarJWT,
        check('nombre', 'El campo nombre del Medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser valido').isMongoId(),
        validarCampos],
    actualizarMedicos);

//Eliminar Medicos
router.delete('/:id', BorrarzarMedicos);

module.exports = router;
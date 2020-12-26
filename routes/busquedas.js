/**
 * Ruta: /api/adminPro/todo
 */
const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {getBusquedaTotal , getDocumentosColeccion} = require('../controllers/busquedasController')

router.get('/:busqueda', [validarJWT] , getBusquedaTotal);
router.get('/coleccion/:tabla/:busqueda', [validarJWT] , getDocumentosColeccion);


module.exports = router;

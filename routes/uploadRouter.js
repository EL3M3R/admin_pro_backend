/**
 * Ruta: /api/adminPro/upload
 */
const { Router } = require('express');
const  espressFileUpload  = require('express-fileupload')

const router = Router();

const {   filesUploads , retornaImagen } = require('../controllers/uploadsController')

const { validarJWT } = require('../middlewares/validar-jwt');
router.use( espressFileUpload() );
 
router.put('/:tipo/:id', [validarJWT] , filesUploads);
router.put('/:tipo/:foto', [validarJWT] , retornaImagen);


module.exports = router;

/**
 * app.use('/api/login' , require('./routes/auth'))
 */
const { Router } = require('express');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { login, loginGoogle , renewToken } = require('../controllers/auth')
const { check } = require('express-validator')

const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], login)

router.post('/google',
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos,
    ], loginGoogle)

router.post('/renew',
     validarJWT
    , renewToken)


module.exports = router;

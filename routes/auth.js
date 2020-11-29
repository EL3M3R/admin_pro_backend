/**
 * app.use('/api/login' , require('./routes/auth'))
 */
const {Router} = require('express');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const {login} = require('../controllers/auth')
const { check } = require('express-validator')


router.post('/' , 
[
    check('password',  'El password es obligatorio').not().isEmpty(),
    check('email' ,  'El email es obligatorio').isEmail(),
    validarCampos,
],login)
 

module.exports = router;

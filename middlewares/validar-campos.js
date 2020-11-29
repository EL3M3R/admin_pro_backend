const {response } = require("express")
const {validationResult} = require('express-validator')

const validarCampos = (req , resp = response , newxt) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return resp.status(400).json({
            ok:false,
            errors: errores.array()
        })
    }

    newxt();
}

module.exports = {
    validarCampos
}
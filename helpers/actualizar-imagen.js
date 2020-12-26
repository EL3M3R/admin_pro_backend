const Usuario = require('../models/usuarios.model')
const Medico = require('../models/medicos')
const Hospital = require('../models/hospital')
require('dotenv').config(); //variables de entorno
const fs = require('fs')


const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        //borrar imagen  
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, path, nombreArchivo) => {
let pathViejo;
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);

            if(!medico){
                console.log("no se enocntro un medico");
                return false;
            }

             pathViejo = `./${process.env.PATH_UIPLOADS}/${tipo}/${medico.img}`;

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;

            await medico.save();
             return true;
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if(!hospital){
                console.log("no se enocntro un hospital");
                return false;
            }

             pathViejo = `./${process.env.PATH_UIPLOADS}/${tipo}/${hospital.img}`;

            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;

            await hospital.save();
             return true;
             break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if(!usuario){
                console.log("no se enocntro un usuario");
                return false;
            }

             pathViejo = `./${process.env.PATH_UIPLOADS}/${tipo}/${usuario.img}`;

            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;

            await usuario.save();
             return true;
            break;
    }

}


 
module.exports = {
    actualizarImagen
}
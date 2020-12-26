
const { response } = require('express')
const {v4: uuidv4} = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
require('dotenv').config(); //variables de entorno
const fs =require('fs')
const path = require('path')

const filesUploads = async(req , res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipos validos
    const tiposValidos = ['medicos' , 'hospitales' , 'usuarios'];
    
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'El tipo recibido no es valido'
        })
    }

    //Validar que exista un archivo
    if(!req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            ok:false,
            msg:'No se encontro ningun archivo'
        });
    }
   
    //Procesar la imagen...

    const file = req.files.imagen
    const nombreCortado = file.name.split('.');
    const extensionArcchivo = nombreCortado[nombreCortado.length -1];

    //validar extensiones validas 
    extensionesValidas = ['png' , 'jpg' ,'jpeg' , 'gif']

    if(!extensionesValidas.includes(extensionArcchivo)){
        return res.status(400).json({
            ok:false,
            msg:'las extensiones permitidas son ' + extensionesValidas
        })
    }

    //Generar nombre del archivo

    const nombreArchivo = `${ uuidv4()}.${extensionArcchivo}`;
    const path= `./${process.env.PATH_UIPLOADS}/${tipo}/${nombreArchivo}`;

    file.mv( path , (err) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen al server'
            });
        }

        actualizarImagen(tipo, id , path , nombreArchivo);
        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        })
    })
}

const retornaImagen = ( req , res = response) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    let pathImagen = path.join( __dirname , `${process.env.PATH_UIPLOADS}/${tipo}/${foto}`);

    //imagen por defecto

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen)
    }else{
      pathImagen = path.join( __dirname , `${process.env.PATH_UIPLOADS}/${process.env.PATH_NO_IMAGE}`);
      res.sendFile(pathImagen)
    }
}


module.exports= {
    filesUploads,
    retornaImagen
}
const mongose = require('mongoose');
require('dotenv').config();

 const db_connection = async() => {
    try {
        await  mongose.connect(process.env.DB_CONN , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });
        console.log("DB online")
    } catch (error) {
        throw new Error('Error a la hora de cone    ctarse a la BD')
    }
 
}

module.exports = {
    db_connection
}
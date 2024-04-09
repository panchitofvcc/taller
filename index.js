
const express =  require('express');
const mongoose = require('mongoose');
require ('dotenv').config();

//importar rutas
const productoRuta = require('./routes/productoRuta');

//configuraciones
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URL;

//configurar express para json
app.use(express.json());

//conexcion a la base de datos
mongoose.connect(MONGODB_URI)
    .then(()=>{
                console.log('conexion con mongoDB exitosa');
                app.listen(PORT,() => {console.log(`servidor en funcionmiento en puerto: ${PORT}`)})
            })
    .catch(error => console.log("error de conexion con mongoDB", error));


// definir rutas
app.use('/ruta-productos', productoRuta)
 
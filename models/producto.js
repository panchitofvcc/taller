const mongoose= require('mongoose');
const productoEsquema = new mongoose.Schema({
        codigo: String,
        nombre: String,
        precio: Number,
        marca: String,
        cantidad: Number
})
const productoModel= mongoose.model ('nombreProducto',productoEsquema,'producto');
module.exports= productoModel;
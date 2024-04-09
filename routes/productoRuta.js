const express =require ('express');
const producto = express.Router();
const productoModel=require('../models/producto');

producto.get ('/', async (req, res)=>{
    try{
        const listaProducto= await productoModel.find();
        console.log(listaProducto);
        res.json(listaProducto);
    }catch(error){
        
        res.status(404).json({mensaje: error.menssage});
    }
    
});


producto.post ('/agregar', async (req, res)=>{
    const nuevoProducto= new productoModel({
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            precio: req.body.precio,
            marca: req.body.marca,
            cantidad: req.body.cantidad,
            prioridad: req.body.prioridad
            
    });

    try{
        const guardarProducto= await nuevoProducto.save();
        res.status(201).json(guardarProducto);
    }catch(error){
        
        res.status(400).json({mensaje: error.menssage});
    }
});


producto.put ('/editar/:id', async (req, res)=>{ 
   
    try{
        const actualizarProducto= await productoModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(actualizarProducto);
        
    }catch(error){
        
        res.status(400).json({mensaje: error.menssage});
    }
});

producto.delete ('/eliminar/:id', async (req, res)=>{
   
    try{
        const eliminarProducto = await productoModel.findByIdAndDelete(req.params.id);
        res.json({mensaje:'tarea eliminada'});
    }catch(error){
        
        res.status(400).json({mensaje: error.menssage});
    }
});


//listar producto por rango de precios

producto.get('/productos/precio/:rango', async (req, res) => {
  const rangoPrecios = req.params.rango.split('-');
  const minPrecio = parseFloat(rangoPrecios[0]);
  const maxPrecio = parseFloat(rangoPrecios[1]);

  try {
    const productosFiltrados = await productoModel.find({
      precio: { $gte: minPrecio, $lte: maxPrecio },
    });
    res.json(productosFiltrados);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});


//Buscar productos con un nombre que contenga una palabra clave:

producto.get('/productos/buscar/:palabraClave', async (req, res) => {
  const palabraClave = req.params.palabraClave;

  try {
    const productosEncontrados = await productoModel.find({
      nombre: { $regex: `.*${palabraClave}.*`, $options: 'i' },
    });
    res.json(productosEncontrados);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Listar productos con stock menor a 5 o sin stock:

producto.get('/cantidad-baja-5', async (req, res) => {
  try {
    const productos = await productoModel.find({
      $or: [{ cantidad: { $lt: 5 } }, { cantidad: 0 }],
    });
    res.json(productos);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});




module.exports=producto;
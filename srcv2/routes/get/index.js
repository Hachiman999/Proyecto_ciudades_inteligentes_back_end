const {Router} = require('express');
const router = Router();
//Ruta para obtener datos del nodo
router.get('/:node',(req,res)=>{
    const {node} = req.params; 

    res.json(`Node ${node}`)
});
//Ruta para obtener todos los datos de todas las entradas de todos los nodos
router.get('/nodes',(req,res)=>{
  
   res.json(`Nodes`)
});
//Ruta para obtener el promedio de las variables de cada nodo
router.get('/avn',(req,res)=>{
  
    res.json(`average of variables of each node`)
});
//Ruta para obtener el promedio de las variables de todos los nodos
router.get('/avnall',(req,res)=>{
  
    res.json(`average of variables of all node`)
});
//Ruta para obtener los datos de todas las entradas de un nodo específico
router.get('/input/:node',(req,res)=>{
    const {node} = req.params; 
    res.json(`get data from all inputs of ${node}`)
});
//Ruta para obtener los datos de la ultima entrada de un nodo específico
router.get('/lastinput/:node',(req,res)=>{
    const {node} = req.params; 
    res.json(`get the data of the last entry of ${node}`)
});
//Ruta para obtener los datos de una variable específica, tabla de variables; 
//1(Temperatura ambiental), 
//2(Humedad), 
//3(Velocidad viento), 
//4(Dirección viento), 
//5(Temperatura agua)
//6(Nivel agua), 
//7(Caudal), 
//8(Flujo)
router.get('/sv/:variable',(req,res)=>{
    const {variable} = req.params; 
    res.json(`get the data of a specific variable, var => ${node}`)
});


module.exports = router; 


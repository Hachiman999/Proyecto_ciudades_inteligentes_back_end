const {Router} = require('express');
const methods = require('./methods'); 
const router = Router();
//Ruta para obtener datos del nodo
router.get('/:node',methods.one_node);
//Ruta para obtener todos los datos de todas las entradas de todos los nodos
router.get('/nodes/all',methods.allDataNodes);
//Ruta para obtener el promedio de las variables de cada nodo
router.get('/avn',methods.avn);
//Ruta para obtener el promedio de las variables de todos los nodos
router.get('/avnall',methods.avnall);
//Ruta para obtener los datos de todas las entradas de un nodo específico
router.get('/input/:node',methods.input_Onenode);
//Ruta para obtener los datos de la ultima entrada de un nodo específico
router.get('/lastinput/:node',methods.lastInput);
//Ruta para obtener los datos de una variable específica, tabla de variables; 
//1(Temperatura ambiental), 
//2(Humedad), 
//3(Velocidad viento), 
//4(Dirección viento), 
//5(Temperatura agua)
//6(Nivel agua), 
//7(Caudal), 
//8(Flujo)
router.get('/sv/:variable',methods.svvar);
//Path to get data from a specific variable from a specific node, variable table;
router.get('/:varS/:nodeS',methods.varSnodeS);

module.exports = router; 


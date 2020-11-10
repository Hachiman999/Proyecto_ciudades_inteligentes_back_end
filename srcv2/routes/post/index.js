const {Router} = require('express');
const router = Router();

const Node = require('../../db/model')
//Ruta para el envío de datos de un nodo-sensor al servidor
router.post('/sd',(req,res)=>{
    const {Numero_nodo,
          Arduino_Ambiente,
          Arduino_Agua,
          Datos_API,
          Fecha_envio } = req.body; 
    
});
module.exports = router; 
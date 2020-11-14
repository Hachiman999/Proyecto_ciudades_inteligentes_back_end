const {Router} = require('express');
const methods = require('./methods'); 
const router = Router();


//Actualizar los datos de un nodo
router.put('/updatenode',methods.updatenode);
module.exports = router; 
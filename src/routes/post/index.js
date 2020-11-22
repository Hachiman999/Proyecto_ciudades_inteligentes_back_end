const { Router } = require("express");
const methods = require("./methods");
const router = Router();

//Ruta para el envío de datos de un nodo-sensor al servidor
router.post("/sd", methods.sd);
//Ruta para la creacion de un nodo
router.post("/cnode", methods.cd);
module.exports = router;

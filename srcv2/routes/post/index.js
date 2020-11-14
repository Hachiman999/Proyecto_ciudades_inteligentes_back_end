const { Router } = require("express");
const methods = require("./methods");
const router = Router();

//Ruta para el envío de datos de un nodo-sensor al servidor
router.post("/sd", methods.sd);
module.exports = router;

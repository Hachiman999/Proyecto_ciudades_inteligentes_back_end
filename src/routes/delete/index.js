const { Router } = require("express");
const methods = require("./methods");
const router = Router();
//borrar nodo
router.delete('/rm/:node', methods.rmNode);

module.exports = router;
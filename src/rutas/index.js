const {Router} = require('express');
const router = Router();

router.use('/api/MySql',require('./ApiREST_MySql'));

//var json1= {}

//router.get('/index', (req,res) => {
//    res.json(json1);
//});

//router.post('/index', (req,res) => {
//	console.log(req.body); //se muestra en la consola el cuerpo de la consulta (json)
//    json1 = req.body;
//    res.send("datos recibidos....");
//});

module.exports = router;

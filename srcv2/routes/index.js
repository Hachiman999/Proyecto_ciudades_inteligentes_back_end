const {Router} = require('express');
const router = Router();

router.get('/',(req, res)=>{
 res.json({respuesta: "hola"}); 
});
router.get('/get', require('./get/index'))
router.post('/post', require('./post/index'))

module.exports = router; 
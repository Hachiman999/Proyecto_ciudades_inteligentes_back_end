const ex = require('express'); 
const env = require('../environment/env'); 

const app = ex(); 
//Middlewares
app.use(ex.json()); 
app.use(ex.urlencoded({extended:false})); 
// settings 
app.get('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    next(); 
  }); 

  app.post('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    next(); 
  }); 

//importing routes
app.use(require('../routes/index'))

//export
module.exports = app; 
const ht = require('./server/httpx'); 
const env = require('./environment/env')
const chalk = require('chalk'); 
async function inicio(){
    await ht.listen(env.PORT,()=>{
   
        console.log(chalk.bold('Running on the port : ')+ chalk.bold.green(env.PORT)); 
    });
}

inicio(); 
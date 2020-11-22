const chalk = require('chalk');
const mariadb = require('mysql'); 
const env = require('../../environment/env'); 

const mariadbConection = mariadb.createConnection(env.db);

mariadbConection.connect( function(error){
    if(error){
        console.log(error);
        return; 
    }else{
        console.log(chalk.bold('Database status')+  )

    }
});

module.exports = mariadbConection;
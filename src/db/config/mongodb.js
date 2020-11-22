const mongoose = require("mongoose");
const env = require('../../environment/env'); 
const chalk = require('chalk'); 
mongoose
  //.connect( `${env.mdbhost.host} ${env.mdbhost.db}`,env.mdbhost.config )
  .connect( `${env.mdb.llave}`,env.mdb.config )
  .then((db) => console.log(chalk.bold('Mongodb Atlas state: ') + chalk.white.bgBlue.bold('connected')))
  .catch((err) => console.log(err));

module.exports = mongoose;
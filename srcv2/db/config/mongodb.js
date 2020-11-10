const mongoose = require("mongoose");
const env = require('../../environment/env'); 
const chalk = require('chalk'); 
mongoose
  .connect( `${env.mdbhost.host} ${env.mdbhost.db}`,env.mdbhost.config )
  .then((db) => console.log(chalk.bold('Mongodb state: ') + chalk.white.bgBlue.bold('connected')))
  .catch((err) => console.log(err));

  module.exports = mongoose;
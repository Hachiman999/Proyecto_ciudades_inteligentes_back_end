////Configuración MongoDB
//Se debe instalar npm install mongodb --save npm i mongoose
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/Proyecto_CiudadesInteligentes')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

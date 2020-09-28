//npm install express morgan
//npm i nodemon -D
//npm install mysql
//npm install mongoose 
//npm install 

const express = require('express'); //se indica que se requiere express
const app = express(); // se inicia express y se instancia en una constante de nombre app.
const morgan = require('morgan'); //se indica que se requiere morgan

//importing routes
const indexRoutes = require('../src/rutas/index');

// settings
app.set('port', process.env.PORT || 3000); //se define el puerto en el cual va a funcionar el servidor. procces.env.PORT (tome el puerto del sistema operativo o el puerto asigando) || 3000 (de lo contrario asigne el puerto 3000)
app.set('json spaces', 2)

// Utilities - middlewares: es una función que se ejecuta antes de que llegen a las rutas 
app.use(morgan('dev')); //se indica que se va a usar morgan en modo dev para retornar mensaje cortos de respuesta cuando se haga peticiones 
app.use(express.urlencoded({extended: false})); //Sirve apra entender  los datos que llegan de los formularios de html, los datos son secillos como texto o archivos nada pesado como imagenes
app.use(express.json()); //se indica que se va a usar la funcionalidad para manejo de json de express

//Routes (en este caso la ruta es /). Toda petición llega con dos parámetros, req en donde llega la consulta y res donde se entrega la respuesta
//app.use(require('./rutas/indexR.js'));
//app.use('/api/MySql',require('./rutas/ApiREST_MySql.js'));
//app.use('/api/MongoBD', require('./rutas/ApiRest_MongoDB'));
app.use('/',indexRoutes); //Me redirecciona al index de rutas

//Start server
app.listen(app.get('port'), ()=> {
	console.log(`server on port ${app.get('port')}`);
}); //se inicia el servidor en el puerto definido y se pone un mensaje en la consola.

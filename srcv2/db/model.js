const { Schema, model } = require('./config/mongodb');

const nodeSchema = new Schema({
    NumNodo: Number,
    Longitud:  Number,
    Temperatura:  Number,
    Humedad:  Number,
    Vel_viento:  Number,
    Dir_Viento: String,
    Temperatura_agua:  Number,
    Nivel_agua:  Number,
    Caudal:  Number,
    Flujo:  Number,
    Punto_rocio:  Number,
    Presion:  Number,
    Nubosidad:  Number,
    Fecha: String,
    Hora: String
}); 

module.exports = model("Nodes", nodeSchema);


/*
{
"NumNodo": 1,
"Longitud": -7.36,
"Temperatura": 20.22805953204135,
"Humedad": 91,
"Vel_viento": 10.427705369192157,
"Dir_Viento": "N",
"Temperatura_agua": 29.81673239717189,
"Nivel_agua": 4.46439432797944,
"Caudal": 3.2486182266260184,
"Flujo": 1.1303340327061577,
"Punto_rocio": 20.99,
"Presion": 1018,
"Nubosidad": 75,
"Fecha": "2020-05-10T05:00:00.000Z",
"Hora": "23:20:19.000000"
  },
*/
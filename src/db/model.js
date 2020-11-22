const { Schema, model } = require('./config/mongodb');

const nodeSchema = new Schema({
  NumNodo: Number,
  Longitud: Number,
  Latitud: Number,
  Bateria: Number,
  Estado: Boolean

});

const dateSchema = new Schema({
  NumNodo: Number,
  Temperatura: Number,
  Humedad: Number,
  Vel_viento: Number,
  Dir_Viento: String,
  Temperatura_agua: Number,
  Nivel_agua: Number,
  Caudal: Number,
  Flujo: Number,
  Punto_rocio: Number,
  Presion: Number,
  Nubosidad: Number,
  Fecha: String,
  Hora: String

})

Nodes = model("Nodes", nodeSchema);
Data = model("Date", dateSchema);
module.exports = { Nodes, Data };


/*
{
"NumNodo": 1,
"Longitud": -7.36,
"Temperatura": 20.22805953204135,
"Humedad": 91,
"Vel_viento": 10.427705369192157,
"Dir_Viento": "N",
"Temperatura_agua"44,
"Caudal": 3.248618: 29.81673239717189,
"Nivel_agua": 4.4643943279792266260184,
"Flujo": 1.1303340327061577,
"Punto_rocio": 20.99,
"Presion": 1018,
"Nubosidad": 75,
"Fecha": "2020-05-10T05:00:00.000Z",
"Hora": "23:20:19.000000"
  },
*/
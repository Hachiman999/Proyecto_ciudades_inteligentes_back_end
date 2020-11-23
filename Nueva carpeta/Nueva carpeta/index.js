const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const env = require('./env');
mongoose
    //.connect( `${env.mdbhost.host} ${env.mdbhost.db}`,env.mdbhost.config )
    .connect(`${env.mdb.llave}`, env.mdb.config)
    .then((db) => console.log("conectado"))
    .catch((err) => console.log(err));

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
const Nodes = model("Nodes", nodeSchema);
const Data = model("Date", dateSchema);


exports.handler = async (event) => {
    var result;
    const {
        NumNodo,
            Longitud,
            Latitud,
            Bateria,
            Estado 
      } = event; 
      if (typeof NumNodo === 'number'
      && typeof Longitud === 'number'
      && typeof Latitud === 'number'
      && typeof Bateria === 'number'
      && typeof Estado === 'boolean'
  ) {
    try {
        await Nodes.updateOne({NumNodo:NumNodo},{
            Longitud,
            Latitud,
            Bateria,
            Estado 
        });
        const data = await Nodes.findOne({ NumNodo: NumNodo });
        result= data; 
    }catch(err){}
  }


    return result; 
};

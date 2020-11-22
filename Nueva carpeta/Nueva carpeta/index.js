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
const Nodes = model("Nodes", nodeSchema);

const app = async (evento) => {
    const result = await Nodes.find({});
    return result;
}

exports.handler = async (event) => {
    const result = await Nodes.find({});

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};

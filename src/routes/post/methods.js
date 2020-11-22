const { Nodes, Data } = require("../../db/model");
const chalk = require("chalk");
const methods_post = {
    sd: async (req, res) => {
        const {
            NumNodo,
            Temperatura,
            Humedad,
            Vel_viento,
            Dir_Viento,
            Temperatura_agua,
            Nivel_agua,
            Caudal,
            Flujo,
            Punto_rocio,
            Presion,
            Nubosidad,
            Fecha,
            Hora } = req.body;
        if (typeof NumNodo === 'number'
            && typeof Temperatura === 'number'
            && typeof Humedad === 'number'
            && typeof Vel_viento === 'number'
            && typeof Dir_Viento === 'string'
            && typeof Temperatura_agua === 'number'
            && typeof Nivel_agua === 'number'
            && typeof Caudal === 'number'
            && typeof Flujo === 'number'
            && typeof Punto_rocio === 'number'
            && typeof Presion === 'number'
            && typeof Nubosidad === 'number'
            && typeof Fecha === 'string'
            && typeof Hora === 'string') {

            const newData = new Data({
                NumNodo,
                Temperatura,
                Humedad,
                Vel_viento,
                Dir_Viento,
                Temperatura_agua,
                Nivel_agua,
                Caudal,
                Flujo,
                Punto_rocio,
                Presion,
                Nubosidad,
                Fecha,
                Hora
            });
            try {
                await newData.save();
                res.json({
                    NumNodo,
                    Temperatura,
                    Humedad,
                    Vel_viento,
                    Dir_Viento,
                    Temperatura_agua,
                    Nivel_agua,
                    Caudal,
                    Flujo,
                    Punto_rocio,
                    Presion,
                    Nubosidad,
                    Fecha,
                    Hora
                });
            } catch (error) {
                console.log(error)
            }
        } else {
            res.json({ respuesta: "one or more data does not comply with the typing settle" })
        }



    },
    cd: async (req, res) => {
        const { NumNodo,
            Longitud,
            Latitud,
            Bateria,
            Estado } = req.body;
        if (typeof NumNodo === 'number'
            && typeof Longitud === 'number'
            && typeof Latitud === 'number'
            && typeof Bateria === 'number'
            && typeof Estado === 'boolean'
        ) {
            const newNode = new Nodes({
                NumNodo,
                Longitud,
                Latitud,
                Bateria,
                Estado
            });
            try {
                await newNode.save();
                const result = await Data.find({ NumNodo: NumNodo });
                console.log(result);

            } catch (err) {
                console.log(chalk.red("El error es :=>") + chalk.white.bgRed(err));
            }

        }


    }
}

module.exports = methods_post; 
const Nodes = require("../../db/model");
const method_get = {
  one_node: async (req, res) => {
    const { node } = req.params;
    const result = await Nodes.find({ NumNodo: node });
    res.json(result);
  },
  avnall: async (req, res) => {
    const data_pro = {
      Longitud,
      Temperatura,
      Humedad,
      Vel_viento,
      Temperatura_agua,
      Nivel_agua,
      Caudal,
      Flujo,
      Punto_rocio,
      Presion,
      Nubosidad,
    };
    const result = await Nodes.find({});
    for (var i = 0; i < result.length; i++) {
      const {
        Longitud,
        Temperatura,
        Humedad,
        Vel_viento,
        Temperatura_agua,
        Nivel_agua,
        Caudal,
        Flujo,
        Punto_rocio,
        Presion,
        Nubosidad,
      } = result[i];

      data_pro.Longitud += Longitud;
      data_pro.Temperatura += Temperatura;
      data_pro.Humedad += Humedad;
      data_pro.Vel_viento += Vel_viento;
      data_pro.Temperatura_agua += Temperatura_agua;
      data_pro.Nivel_agua += Nivel_agua;
      data_pro.Caudal += Caudal;
      data_pro.Flujo += Flujo;
      data_pro.Punto_rocio += Punto_rocio;
      data_pro.Presion += Presion;
      data_pro.Nubosidad += Nubosidad;
    }
    data_pro.Longitud = data_pro.Longitud / result.length;
    data_pro.Temperatura = data_pro.Temperatura / result.length;
    data_pro.Humedad = data_pro.Humedad / result.length;
    data_pro.Vel_viento = data_pro.Vel_viento / result.length;
    data_pro.Temperatura_agua = data_pro.Temperatura_agua / result.length;
    data_pro.Nivel_agua = data_pro.Nivel_agua / result.length;
    data_pro.Caudal = data_pro.Caudal / result.length;
    data_pro.Flujo = data_pro.Flujo / result.length;
    data_pro.Punto_rocio = data_pro.Punto_rocio / result.length;
    data_pro.Presion = data_pro.Presion / result.length;
    data_pro.Nubosidad = data_pro.Nubosidad / result.length;

    res.json(data_pro);
  },
  allDataNodes: async (req, res) => {
    const result = await Nodes.find({});
    res.json(result);
  },
  avn: async (req, res) => {
    const result = await Nodes.find({});
    const data_pro = {
      Longitud: [],
      Temperatura,
      Humedad: [],
      Vel_viento: [],
      Temperatura_agua,
      Nivel_agua: [],
      Caudal,
      Flujo: [],
      Punto_rocio,
      Presion: [],
      Nubosidad: [],
    };
    for (var i = 0; i < result.length; i++) {
      const {
        Longitud,
        Temperatura,
        Humedad,
        Vel_viento,
        Temperatura_agua,
        Nivel_agua,
        Caudal,
        Flujo,
        Punto_rocio,
        Presion,
        Nubosidad,
      } = result[i];
      data_pro.Longitud.push(Longitud);
      data_pro.Temperatura.push(Temperatura);
      data_pro.Humedad.push(Humedad);
      data_pro.Vel_viento.push(Vel_viento);
      data_pro.Temperatura_agua.push(Temperatura_agua);
      data_pro.Nivel_agua.push(Nivel_agua);
      data_pro.Caudal.push(Caudal);
      data_pro.Flujo.push(Flujo);
      data_pro.Punto_rocio.push(Punto_rocio);
      data_pro.Presion.push(Presion);
      data_pro.Nubosidad.push(Nubosidad);
    }
    res.json(data_pro);
  },
  input_Onenode: (req, res) => {
    const { node } = req.params;
    res.json(`get data from all inputs of ${node}`);
  },
  lastInput: (req, res) => {
    const { node } = req.params;
    res.json(`get the data of the last entry of ${node}`);
  },
  svvar: (req, res) => {
    const { variable } = req.params;
    res.json(`get the data of a specific variable, var => ${variable}`);
  },
  varSnodeS: (req, res) => {
    const { varS, nodeS } = req.params;
    res.json(`get the data of a specific variable, var => ${nodeS}`);
  },
};

module.exports = method_get;

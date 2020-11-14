const { Router } = require("express"); //se requiere el enrrutador que viene desde express
const router = Router(); //vamos a gurdarlo en la variable router
const dbConnection = require("../config/db_MySql_connection"); //Requerimos la configuración de la BD y la almacenamos en la constante dbConnection

const Connection = dbConnection(); //Ejecuta la función dbConnection que retorna la conexión a la BD y la almacena en un constante connection

var json1 = {};

//Ruta para obtener datos del nodo
const RutaGET_DatosNodo = "/Get_JSON_DN/:N";
router.get(RutaGET_DatosNodo, (req, res) => {
  var NumNodo = req.params.N;
  var sentencia;
  if (NumNodo == 0) {
    sentencia = "SELECT *FROM datosnodo ORDER BY NumNodo ASC";
  } else if (NumNodo != 0) {
    sentencia = "SELECT *FROM datosnodo WHERE NumNodo=? ORDER BY NumNodo ASC";
  }
  Connection.query(sentencia, [NumNodo], (err, result) => {
    //Hace la consulta, ejecuta un función que puede retornar un error (err) o un resultado (result)
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener todos los datos de todas las entradas de todos los nodos
const RutaGET_EntradaDatos = "/Get_JSON_DTE";
router.get(RutaGET_EntradaDatos, (req, res) => {
  var sentencia =
    "SELECT DD.NumNodo, DD.Longitud, DAM.Temperatura, DAM.Humedad, DAM.Vel_viento, DAM.Dir_Viento, DAG.Temperatura_agua, DAG.Nivel_agua, DAG.Caudal, DAG.Flujo, DA.Punto_rocio, DA.Presion, DA.Nubosidad, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG, datos_api DA WHERE (DA.ID_Arduino=DAM.ID_Arduino) and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DD`.`NumNodo` ASC, `DAM`.`Fecha` DESC, `DAG`.`Hora` DESC LIMIT 50";
  Connection.query(sentencia, (err, result) => {
    //Hace la consulta, ejecuta un función que puede retornar un error (err) o un resultado (result)
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener el promedio de las variables de cada nodo
const RutaGET_Promedio_datos = "/Get_JSON_DNP";
router.get(RutaGET_Promedio_datos, (req, res) => {
  var sentencia =
    "SELECT DD.ID_Nodo, DD.NumNodo, DD.Longitud, DD.Latitud, DD.Bateria, DD.Estado, AVG(DAM.Temperatura) AS PROM_TA, AVG(DAM.Humedad) AS PROM_H, AVG(DAM.Vel_viento) AS PROM_VV, AVG(DAG.Temperatura_agua) AS PROM_TAG, AVG(DAG.Nivel_agua) AS PROM_NA, AVG(DAG.Caudal) AS PROM_C, AVG(DAG.Flujo) AS PROM_F FROM datosnodo DD JOIN datos_arduino_ambiente DAM ON DD.NumNodo = DAM.ID_Arduino JOIN datos_arduino_agua DAG ON DAG.ID_Arduino = DAM.ID_Arduino GROUP BY DD.NumNodo";
  Connection.query(sentencia, (err, result) => {
    //Hace la consulta, ejecuta un función que puede retornar un error (err) o un resultado (result)
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener el promedio de las variables de todos los nodos
const RutaGET_Promedio_varibles_nodos = "/Get_JSON_PVTN";
router.get(RutaGET_Promedio_varibles_nodos, (req, res) => {
  var sentencia =
    "SELECT AVG(DAM.Temperatura) AS PROM_TA, AVG(DAM.Humedad) AS PROM_H, AVG(DAM.Vel_viento) AS PROM_VV, AVG(DAG.Temperatura_agua) AS PROM_TAG, AVG(DAG.Nivel_agua) AS PROM_NA, AVG(DAG.Caudal) AS PROM_C, AVG(DAG.Flujo) AS PROM_F FROM datosnodo DD JOIN datos_arduino_ambiente DAM ON DD.NumNodo = DAM.ID_Arduino JOIN datos_arduino_agua DAG ON DAG.ID_Arduino = DAM.ID_Arduino";
  Connection.query(sentencia, (err, result) => {
    //Hace la consulta, ejecuta un función que puede retornar un error (err) o un resultado (result)
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener los datos de todas las entradas de un nodo específico
const RutaGET_EntradaDatos_NodoEscifico = "/GET_JSON_DEN/:id";
router.get(RutaGET_EntradaDatos_NodoEscifico, (req, res) => {
  var NumNodo = req.params.id;
  var sentencia =
    "SELECT DD.NumNodo, DD.Longitud, DD.Latitud, DAM.Temperatura, DAM.Humedad, DAM.Vel_viento, DAM.Dir_Viento, DAG.Temperatura_agua, DAG.Nivel_agua, DAG.Caudal, DAG.Flujo, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora)  ORDER BY DAM.Fecha ASC,  DAG.Hora ASC LIMIT 20";
  Connection.query(sentencia, [NumNodo], (err, result) => {
    //Hace la consulta, ejecuta un función que puede retornar un error (err) o un resultado (result)mi novia me denuncio de violacion ahora quiere que vuelva HI
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener los datos de la ultima entrada de un nodo específico
const RutaGET_Ultima_EntradaDatos_NodoEscifico = "/GET_JSON_DENE/:id";
router.get(RutaGET_Ultima_EntradaDatos_NodoEscifico, (req, res) => {
  var NumNodo = req.params.id;
  var sentencia =
    "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Temperatura, DAM.Humedad, DAM.Vel_viento, DAM.Dir_Viento, DAG.Temperatura_agua, DAG.Nivel_agua, DAG.Caudal, DAG.Flujo, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 1";
  Connection.query(sentencia, [NumNodo], (err, result) => {
    //Hace la consulta, ejecuta un función que puede retornar un error (err) o un resultado (result)
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

/*Ruta para obtener los datos de una variable específica, tabla de variables; 1(Temperatura ambiental), 2(Humedad), 3(Velocidad viento), 4(Dirección viento), 5(Temperatura agua)
6(Nivel agua), 7(Caudal), 8(Flujo)*/
const RutaGET_variable_especififa = "/GET_JSON_VE/:var";
router.get(RutaGET_variable_especififa, (req, res) => {
  var VarEs = req.params.var;
  var sentencia;
  if (VarEs == 1) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Temperatura Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 2) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Humedad Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 3) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Vel_viento Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 4) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Dir_Viento Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 5) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Temperatura_agua Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 6) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Nivel_agua Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 7) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Caudal Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 8) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Flujo Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 9) {
    console.log("No existe esa variable");
  }
  Connection.query(sentencia, (err, result) => {
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

/*Ruta para obtener los datos de una variable específica de un nodo específico, tabla de variables; 1(Temperatura ambiental), 2(Humedad), 3(Velocidad viento), 4(Dirección viento), 5(Temperatura agua)
6(Nivel agua), 7(Caudal), 8(Flujo)*/
const RutaGET_variable_especififa_Nodo_especifico = "/GET_JSON_VE/:var/NE/:id";
router.get(RutaGET_variable_especififa_Nodo_especifico, (req, res) => {
  var VarEs = req.params.var;
  var NumNodo = req.params.id;
  var sentencia;
  if (VarEs == 1) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Temperatura Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and  (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 2) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Humedad Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 3) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Vel_viento Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 4) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Dir_Viento Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 5) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Temperatura_agua Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 6) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Nivel_agua Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 7) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Caudal Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  } else if (VarEs == 8) {
    sentencia =
      "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAG.Flujo Var, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and  (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAM`.`Fecha` DESC,  `DAG`.`Hora` DESC LIMIT 10";
  }
  Connection.query(sentencia, [NumNodo], (err, result) => {
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener datos de variables por medio de la fecha
const RutaGET_Fecha = "/GET_JSON_Fecha//:AAAA/:MM/:DD";
router.get(RutaGET_Fecha, (req, res) => {
  var NumNodo = req.params.id;
  var Ao = req.params.AAAA;
  var Mes = req.params.MM;
  var Dia = req.params.DD;
  var Fecha = "" + Ao + "/" + Mes + "/" + Dia + "";
  var sentencia =
    "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Temperatura, DAM.Humedad, DAM.Vel_viento, DAM.Dir_Viento, DAG.Temperatura_agua, DAG.Nivel_agua, DAG.Caudal, DAG.Flujo, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DAM.Fecha=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Hora` DESC LIMIT 10";
  Connection.query(sentencia, [Fecha], (err, result) => {
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obentener datos de variables por medio de la fecha y con nodo específico
const RutaGET_Fecha_Nodo_especifico = "/GET_JSON_Fecha//:AAAA/:MM/:DD/&/NE/:id";
router.get(RutaGET_Fecha_Nodo_especifico, (req, res) => {
  var NumNodo = req.params.id;
  var Ao = req.params.AAAA;
  var Mes = req.params.MM;
  var Dia = req.params.DD;
  var Fecha = "" + Ao + "/" + Mes + "/" + Dia + "";
  var sentencia =
    "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Temperatura, DAM.Humedad, DAM.Vel_viento, DAM.Dir_Viento, DAG.Temperatura_agua, DAG.Nivel_agua, DAG.Caudal, DAG.Flujo, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DD.NumNodo=? and DAM.Fecha=? and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY `DAG`.`Hora` DESC LIMIT 10";
  Connection.query(sentencia, [NumNodo, Fecha], (err, result) => {
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener datos de variables por medio de la fecha y un rango de horas cerradas
const RutaGET_Fecha_Hora = "/GET_JSON_F//:AAAA/:MM/:DD/H//:H1/:H2";
router.get(RutaGET_Fecha_Hora, (req, res) => {
  var Ao = req.params.AAAA;
  var Mes = req.params.MM;
  var Dia = req.params.DD;
  var H1 = req.params.H1;
  var H2 = req.params.H2;
  var Fecha = "" + Ao + "/" + Mes + "/" + Dia + "";
  var Hora1 = "" + H1 + ":00:00";
  var Hora2 = "" + H2 + ":59:59";
  var sentencia =
    "SELECT DD.NumNodo, DD.Longitud, DD.Latitud ,DAM.Temperatura, DAM.Humedad, DAM.Vel_viento, DAM.Dir_Viento, DAG.Temperatura_agua, DAG.Nivel_agua, DAG.Caudal, DAG.Flujo, DAM.Fecha, DAG.Hora FROM datosnodo DD, datos_arduino_ambiente DAM, datos_arduino_agua DAG WHERE DAM.Fecha=?  and (DAM.Hora BETWEEN ? AND ?) and (DAM.ID_Arduino=DD.NumNodo and DAG.ID_Arduino = DD.NumNodo) and (DAM.Fecha = DAG.Fecha and DAM.Hora=DAG.Hora) ORDER BY DAG.Fecha DESC, DAG.Hora DESC LIMIT 10";
  Connection.query(sentencia, [Fecha, Hora1, Hora2], (err, result) => {
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener datos de la API
const RutaGET_DatosAPI = "/Get_JSON_DA";
router.get(RutaGET_DatosAPI, (req, res) => {
  var sentencia = "SELECT * FROM datos_api ORDER BY ID_Arduino  ASC";
  Connection.query(sentencia, (err, result) => {
    //Hace la consulta, ejecuta un función que puede retornar un error (err) o un resultado (result)
    if (err) throw err;
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener los datos del usuario
const RutaGET_Datos_user = "/GET_JSON_USR/:mail";
router.get(RutaGET_Datos_user, (req, res) => {
  var MailID = req.params.mail;
  var sentencia = "SELECT * FROM datos_user WHERE Mail=?";
  Connection.query(sentencia, [MailID], (err, result) => {
    if (err) throw err;
    if (result != "") {
      console.log(result);
      res.json(result);
      res.status(200);
    } else {
      res.send("No hay datos en la base de datos ");
      res.status(204);
    }
  });
});

//Ruta para obtener el ultimo JSON que recibó el servidor
const RutaGET = "/Get_JSON";
router.get(RutaGET, (req, res) => {
  req.json(json1);
});

//Ruta para el envío de datos de un nodo-sensor al servidor
const RutaPOST = "/Post_JSON";
router.post(RutaPOST, (req, res) => {
  router.get(
    "https://api.openweathermap.org/data/2.5/onecall?lat=3.44&lon=-76.52&units=metric&exclude=hourly,daily&appid=c0f5717aa0d453fc7c3843390e59e72e",
    (req, res) => {
      console.log(res);
    }
  );
  json1 = req.body;
  console.log(req.body);
  var NumNodo = req.body.Numero_nodo;
  var Temp_Amb = req.body.Arduino_Ambiente.Temperatura;
  var Hum = req.body.Arduino_Ambiente.Humedad;
  var Vel = req.body.Arduino_Ambiente.Vel_Viento;
  var Dir = req.body.Arduino_Ambiente.Dir_Viento;
  var Temp_Ag = req.body.Arduino_Agua.Temperatura_Rio;
  var Niv = req.body.Arduino_Agua.Nivel_Agua;
  var Cau = req.body.Arduino_Agua.Caudal;
  var Flu = req.body.Arduino_Agua.Flujo;
  var Pun_rocio = req.body.Datos_API.Punto_rocio;
  var Pres = req.body.Datos_API.Presion;
  var Nubes = req.body.Datos_API.Nubosidad;
  var Fecha = req.body.Fecha_envio.fecha;
  var Hora = req.body.Fecha_envio.hora;

  console.log(
    NumNodo,
    Temp_Amb,
    Hum,
    Vel,
    Dir,
    Temp_Ag,
    Niv,
    Cau,
    Flu,
    Pun_rocio,
    Pres,
    Nubes,
    Fecha,
    Hora
  );

  var sentencia1 =
    "INSERT INTO datos_arduino_ambiente (ID_Arduino, Temperatura, Humedad, Vel_viento, Dir_Viento, Fecha, Hora) VALUES (?,?,?,?,?,?,?)";
  var sentencia2 =
    "INSERT INTO datos_arduino_agua (ID_Arduino, Temperatura_agua, Nivel_agua, Caudal, Flujo, Fecha, Hora) VALUES (?,?,?,?,?,?,?)";
  var sentencia3 =
    "INSERT INTO datos_api (ID_Arduino, Punto_rocio, Presion, Nubosidad, Fecha, Hora) VALUES (?,?,?,?,?,?)";
  if (
    NumNodo &&
    Temp_Amb &&
    Hum &&
    Vel &&
    Dir &&
    Temp_Ag &&
    Niv &&
    Cau &&
    Flu &&
    Pun_rocio &&
    Pres &&
    Nubes &&
    Fecha &&
    Hora
  ) {
    Connection.query(
      sentencia1,
      [NumNodo, Temp_Amb, Hum, Vel, Dir, Fecha, Hora],
      (err1, result1) => {
        res.status(201);
        //console.log(result1);
        //console.log('RowAffected datos_arduino_ambiente: '+ result1.affectedRows);
      }
    );
    Connection.query(
      sentencia2,
      [NumNodo, Temp_Ag, Niv, Cau, Flu, Fecha, Hora],
      (err2, result2) => {
        res.status(201);
        //console.log(result2);
        //console.log('RowAffected datos_arduino_agua: ' + result2.affectedRows);
      }
    );
    Connection.query(
      sentencia3,
      [NumNodo, Pun_rocio, Pres, Nubes, Fecha, Hora],
      (err3, result3) => {
        res.status(201);
        //console.log(result2);
        //console.log('RowAffected datos_arduino_agua: ' + result2.affectedRows);
      }
    );
  } else {
    res.status(400);
    res.send("Hay error en las variables");
  }
  res.send("Datos recibidos");
});

//Actualizar los datos de un nodo
const RutaPUT_Cofig_nodo = "/PUT_JSON_CONF_NODO";
router.put(RutaPUT_Cofig_nodo, (req, res) => {
  var IDN = req.body.IDNodo;
  var NN = req.body.NumNodo;
  var Lon = req.body.Longitud;
  var Lat = req.body.Latitud;
  var Est = req.body.Estado;
  console.log(NN, Lon, Lat, Est);
  var sentencia =
    "UPDATE datosnodo SET NumNodo=?, Longitud=?, Latitud=?, Estado=? WHERE ID_Nodo=?";
  Connection.query(sentencia, [NN, Lon, Lat, Est, IDN], (err1, result1) => {
    //res.status(201);
    console.log(result1);
    //console.log('RowAffected datos_arduino_ambiente: '+ result1.affectedRows);
  });
  res.status(200);
  res.send("Datos actualizados");
});

const RutaPUT_User = "/PUT_JSON_USR";
router.put(RutaPUT_User, (req, res) => {
  var TID = req.body.TipoID;
  var NID = req.body.NumID;
  var N = req.body.Nombre;
  var A = req.body.Apellido;
  var M = req.body.Mail;
  var C = req.body.Celular;
  var D = req.body.Direccion;
  console.log(TID, NID, N, A, M, C, D);
  var sentencia =
    "UPDATE datos_user SET Tipo_ID=?, ID=?, Nombre=?, Apellido=?, `Celular`=?, Dirección=? WHERE Mail=?";
  //var sentencia = 'UPDATE datos_user SET (Tipo_ID, ID, Nombre, Apellido, Celular, Dirección) VALUES (?,?,?,?,?,?) WHERE Mail=?';
  Connection.query(sentencia, [TID, NID, N, A, C, D, M], (err1, result1) => {
    //res.status(201);
    console.log(result1);
    console.log(err1);
    //console.log('RowAffected datos_arduino_ambiente: '+ result1.affectedRows);
  });
  res.status(200);
  res.send("Datos actualizados");
});

//Eliminar un nodo
const RutaDELETE_Nodo = "/DELETE_JSON_N/:id";
router.delete(RutaDELETE_Nodo, (req, res) => {
  var IDN = req.params.id;
  console.log(IDN);
  var sentencia = "DELETE FROM datosnodo WHERE ID_Nodo =?";
  Connection.query(sentencia, [IDN], (err, result) => {
    console.log(result);
  });
  res.status(200);
  res.send("Nodo eliminado");
});

//Agregar un nuevo nodo
const RutaPOST_nuevo_nodo = "/POST_JSON_AN";
router.post(RutaPOST_nuevo_nodo, (req, res) => {
  var NN = req.body.NumNodo;
  var Lon = req.body.Longitud;
  var Lat = req.body.Latitud;
  var Bat = req.body.Bateria;
  var Est = req.body.Estado;
  console.log(NN, Lon, Lat, Bat, Est);
  var sentencia =
    "INSERT INTO datosnodo (ID_Nodo, NumNodo, Longitud, Latitud, Estado, Bateria) VALUES (null,?,?,?,?,?)";
  Connection.query(sentencia, [NN, Lon, Lat, Est, Bat], (err1, result1) => {
    //res.status(201);
    console.log(result1);
    //console.log('RowAffected datos_arduino_ambiente: '+ result1.affectedRows);
  });
  res.status(201);
  res.send("Nodo agregado");
});

module.exports = router; //Exporta el router

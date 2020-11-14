const Nodes = require('../../db/model');
const methods_post={
    sd:async (req,res)=>{
        const {
            NumNodo,
            Longitud,
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
            Hora} = req.body; 
        if(typeof  NumNodo === 'number' 
           && typeof Longitud === 'number' 
           &&  typeof Temperatura === 'number' 
           &&  typeof  Humedad === 'number'
           &&  typeof  Vel_viento === 'number'
           &&  typeof  Dir_Viento === 'string'
           &&  typeof Temperatura_agua === 'number'
           &&  typeof  Nivel_agua === 'number'
           &&  typeof Caudal === 'number'
           &&  typeof  Flujo === 'number'
           &&  typeof  Punto_rocio === 'number'
           &&  typeof  Presion === 'number'
           &&  typeof  Nubosidad === 'number'
           &&  typeof  Fecha === 'string'
           &&  typeof  Hora === 'string' ){
           
            const newNode = new Nodes({
                NumNodo,
                Longitud,
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
            try{
                await newNode.save();
                res.json({
                    NumNodo,
                    Longitud,
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
            }catch(error){
                console.log(error)
            }
        }else{
            res.json({respuesta: "one or more data does not comply with the typing settle"})
        }
        
      
        
    }
}

module.exports = methods_post; 
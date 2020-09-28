/////Configuración MySql
//npm install mysql

/*const mysql = require('mysql');
module.exports = () => { //exportar una función
    return mysql.createConnection({ //general la conexión
        host: 'ec2-54-224-120-72.compute-1.amazonaws.com',
        user: 'PCI',
        password: 'PCI2020',
        database: 'proyectociudadesinteligentes'
    });
}*/

const mysql = require('mysql');
module.exports = () => { //exportar una función
    return mysql.createConnection({ //general la conexión
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'proyectociudadesinteligentes'
    });
}


/*const mysql = require('mysql');
module.exports = () =>{ //exportar una función
    return mysql.createConnection({ //general la conexión
        host: 'bxnk9fnjog0pa821y9la-mysql.services.clever-cloud.com',
        user: 'utuhznhzxribgnik',
        password: 'Zoma4eSyEjLpaeNN6wo7',
        database: 'bxnk9fnjog0pa821y9la'
    });
}*/
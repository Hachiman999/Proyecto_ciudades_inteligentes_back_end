const env ={
    PORT : process.env.PORT || 3000
}
env.db ={
    
        host: 'localhost',
        user:'root',
        password:'root',
        database:'database'
    }
env.mdb ={
       host: 'mongodb://localhost:27017/',
       db: 'compu', 
       config:  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }       
    }
module.exports = env; 
const env = {
    PORT: process.env.PORT || 3030
}
env.db = {

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'database'
}
env.mdb = {
    llave: "mongodb+srv://tvbotbdproyecto:5UV2qVL3XWrlL76k@cluster0.7h1um.mongodb.net/tvvideo?retryWrites=true&w=majority",
    host: 'mongodb://localhost:27017/',
    db: 'compu',
    config: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}
module.exports = env; 
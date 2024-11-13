// db.js
const sql = require("mssql");

// Configuração de conexão com o banco de dados
const dbConfig = {
    user: "seuUsuario",
    password: "suaSenha",
    server: "seuServidor",
    database: "suaBaseDeDados",
    options: {
    encrypt: true,
    enableArithAbort: true,
    },
};

// Conexão com o banco de dados
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Conectado ao SQL Server com sucesso!");
        return pool;
    })
    .catch(err => console.error("Falha na conexão com o banco de dados", err));

module.exports = {
    sql, poolPromise
};

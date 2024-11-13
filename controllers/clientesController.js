// controllers/clientesController.js
const { sql, poolPromise } = require("../db");

// Inserir Cliente
exports.inserirCliente = async (req, res) => {
    try {
        const { nome, email, telefone, endereco } = req.body;
        const pool = await poolPromise;
        await pool.request()
        .input("nome", sql.VarChar(100), nome)
        .input("email", sql.VarChar(100), email)
        .input("telefone", sql.VarChar(15), telefone)
        .input("endereco", sql.VarChar(255), endereco)
        .execute("sp_inserir_cliente");
        res.status(201).send("Cliente inserido com sucesso!");
    } catch (err) {
        res.status(500).send("Erro ao inserir cliente: " + err.message);
    }
};

// Consultar Cliente
exports.consultarCliente = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const pool = await poolPromise;
        const result = await pool.request()
        .input("cliente_id", sql.Int, clienteId)
        .execute("sp_consultar_cliente");
        res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).send("Erro ao consultar cliente: " + err.message);
        }
};

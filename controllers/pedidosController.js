// controllers/pedidosController.js
const { sql, poolPromise } = require("../db");

// Finalizar Compra
exports.finalizarCompra = async (req, res) => {
    try {
        const { cliente_id } = req.body;
        const pool = await poolPromise;
        await pool.request()
        .input("cliente_id", sql.Int, cliente_id)
        .execute("sp_finalizar_compra");
        res.send("Compra finalizada com sucesso!");
        } catch (err) {
            res.status(500).send("Erro ao finalizar a compra: " + err.message);
        }
};

// Consultar Pedido
exports.consultarPedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pool = await poolPromise;
        const result = await pool.request()
        .input("pedido_id", sql.Int, pedidoId)
        .query("SELECT * FROM Pedidos WHERE pedido_id = @pedido_id");
        res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).send("Erro ao consultar pedido: " + err.message);
        }
};

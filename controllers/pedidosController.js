// controllers/pedidosController.js
const { sql, poolPromise } = require("../db");

// Finalizar Pedido
exports.finalizarPedido = async (req, res) => {
    try {
        const { carrinho_id } = req.body;
        const pool = await poolPromise;

    // Calcular total
    const totalResult = await pool.request()
        .input("carrinho_id", sql.Int, carrinho_id)
        .query(`
            SELECT SUM(ic.quantidade * p.preco) AS total
            FROM Itens_Carrinho ic
            JOIN Produtos p ON ic.produto_id = p.produto_id
            WHERE ic.carrinho_id = @carrinho_id
        `);
        const total = totalResult.recordset[0]?.total || 0;

    // Inserir Pedido
    await pool.request()
        .input("carrinho_id", sql.Int, carrinho_id)
        .input("total", sql.Decimal(10, 2), total)
        .query("INSERT INTO Pedidos (carrinho_id, total) VALUES (@carrinho_id, @total)");
        res.send("Pedido finalizado com sucesso!");
        } catch (err) {
            res.status(500).send("Erro ao finalizar pedido: " + err.message);
        }
};

// Verificar Status do Pedido
exports.verificarStatusPedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pool = await poolPromise;
        const result = await pool.request()
        .input("pedido_id", sql.Int, pedidoId)
        .query("SELECT pedido_id, status FROM Pedidos WHERE pedido_id = @pedido_id");
        res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).send("Erro ao verificar status do pedido: " + err.message);
        }
};

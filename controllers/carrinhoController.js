// controllers/carrinhoController.js
const { sql, poolPromise } = require("../db");

// Adicionar Item ao Carrinho
exports.adicionarItemCarrinho = async (req, res) => {
    try {
        const { carrinho_id, produto_id, quantidade } = req.body;
        const pool = await poolPromise;
        await pool.request()
        .input("carrinho_id", sql.Int, carrinho_id)
        .input("produto_id", sql.Int, produto_id)
        .input("quantidade", sql.Int, quantidade)
        .execute("sp_adicionar_item_carrinho");
        res.send("Item adicionado ao carrinho!");
        } catch (err) {
            res.status(500).send("Erro ao adicionar item ao carrinho: " + err.message);
        }
};

// Remover Item do Carrinho
exports.removerItemCarrinho = async (req, res) => {
    try {
        const item_carrinho_id = req.params.id;
        const pool = await poolPromise;
        await pool.request()
        .input("item_carrinho_id", sql.Int, item_carrinho_id)
        .execute("sp_remover_item_carrinho");
        res.send("Item removido do carrinho!");
        } catch (err) {
            res.status(500).send("Erro ao remover item do carrinho: " + err.message);
        }
};

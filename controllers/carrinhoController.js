// controllers/carrinhoController.js
const { sql, poolPromise } = require("../db");

// Criar Carrinho
exports.criarCarrinho = async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request().query("INSERT INTO Carrinho (data_criacao) VALUES (GETDATE())");
        res.status(201).send("Carrinho criado com sucesso!");
        } catch (err) {
            res.status(500).send("Erro ao criar carrinho: " + err.message);
        }
};

// Adicionar Item ao Carrinho
exports.adicionarItemCarrinho = async (req, res) => {
    try {
        const { carrinho_id, produto_id, quantidade } = req.body;
        const pool = await poolPromise;

    // Verificar estoque
    const estoqueResult = await pool.request()
        .input("produto_id", sql.Int, produto_id)
        .query("SELECT estoque FROM Produtos WHERE produto_id = @produto_id");
        const estoqueDisponivel = estoqueResult.recordset[0]?.estoque || 0;

    if (estoqueDisponivel < quantidade) {
        return res.status(400).send("Estoque insuficiente para o produto.");
    }

    // Adicionar item ao carrinho
    await pool.request()
        .input("carrinho_id", sql.Int, carrinho_id)
        .input("produto_id", sql.Int, produto_id)
        .input("quantidade", sql.Int, quantidade)
        .query("INSERT INTO Itens_Carrinho (carrinho_id, produto_id, quantidade) VALUES (@carrinho_id, @produto_id, @quantidade)");
        res.send("Item adicionado ao carrinho com sucesso!");
        } catch (err) {
            res.status(500).send("Erro ao adicionar item ao carrinho: " + err.message);
        }
};

// Remover Item do Carrinho
exports.removerItemCarrinho = async (req, res) => {
    try {
        const itemId = req.params.id;
        const pool = await poolPromise;
        await pool.request()
        .input("item_id", sql.Int, itemId)
        .query("DELETE FROM Itens_Carrinho WHERE item_id = @item_id");
        res.send("Item removido do carrinho com sucesso!");
        } catch (err) {
            res.status(500).send("Erro ao remover item do carrinho: " + err.message);
        }
};

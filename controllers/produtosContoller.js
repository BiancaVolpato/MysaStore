// controllers/produtosController.js
const { sql, poolPromise } = require("../db");

// Inserir Produto
exports.inserirProduto = async (req, res) => {
    try {
        const { nome, descricao, preco, estoque } = req.body;
        const pool = await poolPromise;
        await pool.request()
        .input("nome", sql.VarChar(150), nome)
        .input("descricao", sql.VarChar(255), descricao)
        .input("preco", sql.Decimal(10, 2), preco)
        .input("estoque", sql.Int, estoque)
        .query("INSERT INTO Produtos (nome, descricao, preco, estoque) VALUES (@nome, @descricao, @preco, @estoque)");
        res.status(201).send("Produto inserido com sucesso!");
        } catch (err) {
            res.status(500).send("Erro ao inserir produto: " + err.message);
        }
};

// Atualizar Estoque
exports.atualizarEstoque = async (req, res) => {
    try {
        const { produto_id, quantidade } = req.body;
        const pool = await poolPromise;
        await pool.request()
        .input("produto_id", sql.Int, produto_id)
        .input("quantidade", sql.Int, quantidade)
        .query("UPDATE Produtos SET estoque = estoque + @quantidade WHERE produto_id = @produto_id");
        res.send("Estoque atualizado com sucesso!");
        } catch (err) {
            res.status(500).send("Erro ao atualizar estoque: " + err.message);
        }
};

// Consultar Produto
exports.consultarProduto = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const pool = await poolPromise;
        const result = await pool.request()
        .input("produto_id", sql.Int, produtoId)
        .query("SELECT * FROM Produtos WHERE produto_id = @produto_id");
        res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).send("Erro ao consultar produto: " + err.message);
        }
};

// routes/produtosRoutes.js
const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController");

router.post("/produtos", produtosController.inserirProduto);
router.put("/produtos/estoque", produtosController.atualizarEstoque);

module.exports = router;

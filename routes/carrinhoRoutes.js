// routes/carrinhoRoutes.js
const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/carrinhoController");

router.post("/carrinho/adicionar", carrinhoController.adicionarItemCarrinho);
router.delete("/carrinho/remover/:id", carrinhoController.removerItemCarrinho);

module.exports = router;

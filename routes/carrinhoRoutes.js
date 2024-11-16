// routes/carrinhoRoutes.js
const express = require("express");
const router = express.Router();
const carrinhoController = require("../controllers/carrinhoController");

router.post("/carrinho", carrinhoController.criarCarrinho);
router.post("/carrinho/item", carrinhoController.adicionarItemCarrinho);
router.delete("/carrinho/item/:id", carrinhoController.removerItemCarrinho);

module.exports = router;

// routes/pedidosRoutes.js
const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");

router.post("/pedidos/finalizar", pedidosController.finalizarCompra);
router.get("/pedidos/:id", pedidosController.consultarPedido);

module.exports = router;

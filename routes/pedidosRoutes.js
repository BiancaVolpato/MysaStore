// routes/pedidosRoutes.js
const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");

router.post("/pedidos", pedidosController.finalizarPedido);
router.get("/pedidos/:id/status", pedidosController.verificarStatusPedido);

module.exports = router;

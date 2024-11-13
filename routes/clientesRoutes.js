// routes/clientesRoutes.js
const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

router.post("/clientes", clientesController.inserirCliente);
router.get("/clientes/:id", clientesController.consultarCliente);

module.exports = router;

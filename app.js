// app.js
const express = require("express");
const app = express();
const produtosRoutes = require("./routes/produtosRoutes");
const carrinhoRoutes = require("./routes/carrinhoRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");

app.use(express.json());
app.use("/api", produtosRoutes);
app.use("/api", carrinhoRoutes);
app.use("/api", pedidosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

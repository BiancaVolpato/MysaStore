// app.js
const express = require("express");
const app = express();
const clientesRoutes = require("./routes/clientesRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const carrinhoRoutes = require("./routes/carrinhoRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");

app.use(express.json());

// Rotas
app.use("/api", clientesRoutes);
app.use("/api", produtosRoutes);
app.use("/api", carrinhoRoutes);
app.use("/api", pedidosRoutes);

// Porta e inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

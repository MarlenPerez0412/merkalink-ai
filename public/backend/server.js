const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productosRoutes = require("./routes/productosRoutes");
const ventasRoutes = require("./routes/ventasRoutes");
const alertasRoutes = require("./routes/alertasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API MercaLink AI funcionando correctamente",
  });
});

app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);
app.use("/alertas", alertasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
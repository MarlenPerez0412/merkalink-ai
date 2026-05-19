const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventasController");

router.get("/", ventasController.obtenerVentas);
router.post("/", ventasController.crearVenta);

module.exports = router;
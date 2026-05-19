const db = require("../config/db");

exports.obtenerVentas = (req, res) => {
  const sql = `
    SELECT 
      ventas.id,
      ventas.producto_id,
      productos.nombre AS producto,
      ventas.cantidad,
      ventas.canal,
      ventas.fecha,
      productos.precio,
      (ventas.cantidad * productos.precio) AS total
    FROM ventas
    INNER JOIN productos ON ventas.producto_id = productos.id
    ORDER BY ventas.fecha DESC
  `;

  db.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener ventas", error });
    }

    res.json(resultados);
  });
};

exports.crearVenta = (req, res) => {
  const { producto_id, cantidad, canal } = req.body;

  if (!producto_id || !cantidad || !canal) {
    return res.status(400).json({ mensaje: "Faltan datos de la venta" });
  }

  db.query("SELECT * FROM productos WHERE id = ?", [producto_id], (error, productos) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al buscar producto", error });
    }

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const producto = productos[0];

    if (producto.stock < cantidad) {
      return res.status(400).json({ mensaje: "Stock insuficiente" });
    }

    const sqlVenta = `
      INSERT INTO ventas (producto_id, cantidad, canal)
      VALUES (?, ?, ?)
    `;

    db.query(sqlVenta, [producto_id, cantidad, canal], (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al registrar venta", error });
      }

      const nuevoStock = producto.stock - cantidad;

      db.query(
        "UPDATE productos SET stock = ? WHERE id = ?",
        [nuevoStock, producto_id],
        (error) => {
          if (error) {
            return res.status(500).json({ mensaje: "Error al actualizar stock", error });
          }

          res.status(201).json({
            mensaje: "Venta registrada correctamente",
            id: resultado.insertId,
            stock_actual: nuevoStock,
          });
        }
      );
    });
  });
};
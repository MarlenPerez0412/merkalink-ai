const db = require("../config/db");

exports.obtenerProductos = (req, res) => {
  const sql = "SELECT * FROM productos ORDER BY id DESC";

  db.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al obtener productos", error });
    }

    res.json(resultados);
  });
};

exports.crearProducto = (req, res) => {
  const { nombre, precio, stock, categoria } = req.body;

  if (!nombre || precio === undefined || stock === undefined || !categoria) {
    return res.status(400).json({ mensaje: "Faltan datos del producto" });
  }

  const sql = `
    INSERT INTO productos (nombre, precio, stock, categoria)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nombre, precio, stock, categoria], (error, resultado) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al crear producto", error });
    }

    res.status(201).json({
      mensaje: "Producto creado correctamente",
      id: resultado.insertId,
    });
  });
};

exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, categoria } = req.body;

  const sql = `
    UPDATE productos
    SET nombre = ?, precio = ?, stock = ?, categoria = ?
    WHERE id = ?
  `;

  db.query(sql, [nombre, precio, stock, categoria, id], (error, resultado) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al actualizar producto", error });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto actualizado correctamente" });
  });
};

exports.eliminarProducto = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM productos WHERE id = ?";

  db.query(sql, [id], (error, resultado) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al eliminar producto", error });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  });
};
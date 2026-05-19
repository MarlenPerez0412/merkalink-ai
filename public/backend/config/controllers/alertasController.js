const db = require("../config/db");

exports.obtenerAlertas = (req, res) => {
  const alertas = [];

  const sqlStockCritico = `
    SELECT id, nombre, stock, categoria
    FROM productos
    WHERE stock < 5
  `;

  db.query(sqlStockCritico, (error, productos) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al generar alertas", error });
    }

    productos.forEach((producto) => {
      alertas.push({
        producto_id: producto.id,
        tipo: "Stock crítico",
        mensaje: `El producto ${producto.nombre} tiene stock bajo: ${producto.stock} unidades`,
        nivel: "Alta",
      });
    });

    const sqlMasVendidos = `
      SELECT 
        productos.id,
        productos.nombre,
        SUM(ventas.cantidad) AS total_vendido
      FROM ventas
      INNER JOIN productos ON ventas.producto_id = productos.id
      GROUP BY productos.id, productos.nombre
      HAVING total_vendido >= 10
    `;

    db.query(sqlMasVendidos, (error, vendidos) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al generar alertas de ventas", error });
      }

      vendidos.forEach((producto) => {
        alertas.push({
          producto_id: producto.id,
          tipo: "Reabastecimiento recomendado",
          mensaje: `${producto.nombre} es un producto muy vendido. Se recomienda reabastecer.`,
          nivel: "Media",
        });
      });

      res.json(alertas);
    });
  });
};
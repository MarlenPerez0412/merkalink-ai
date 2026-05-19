USE merkalink_ai;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS alertas;
DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(50) NOT NULL
);
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    canal VARCHAR(50) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (producto_id)
    REFERENCES productos(id)
);
CREATE TABLE alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    tipo VARCHAR(50),
    mensaje TEXT,
    nivel VARCHAR(20),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (producto_id)
    REFERENCES productos(id)
);
INSERT INTO productos (nombre, precio, stock, categoria)
VALUES
('Pantalla iPhone 11', 950.00, 3, 'Refacciones'),
('Bateria Samsung A12', 450.00, 8, 'Refacciones'),
('Memoria RAM 8GB', 650.00, 4, 'Componentes'),
('SSD 240GB', 520.00, 10, 'Componentes'),
('Cargador Universal Laptop', 380.00, 2, 'Accesorios');
INSERT INTO ventas (producto_id, cantidad, canal)
VALUES
(1, 2, 'Facebook'),
(1, 1, 'WhatsApp'),
(2, 3, 'Tienda Fisica'),
(3, 2, 'Instagram'),
(5, 1, 'WhatsApp');
SELECT * FROM productos;
SELECT * FROM ventas;
SELECT * FROM ventas;
INSERT INTO alertas (producto_id, tipo, mensaje, nivel)
SELECT 
    id,
    'Stock critico',
    CONCAT('El producto ', nombre, ' tiene stock bajo'),
    'Critica'
FROM productos
WHERE stock < 5;
SELECT * FROM alertas;

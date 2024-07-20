// routes/productos.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Listar productos
router.get('/', (req, res) => {
  db.all('SELECT p.*, c.categoria FROM productos p LEFT JOIN categorias c ON p.categoria_id = c.id', (err, rows) => {
    if (err) throw err;
    db.all('SELECT * FROM categorias', (err, categorias) => {
      if (err) throw err;
      res.render('productos', { productos: rows, categorias: categorias });
    });
  });
});

// Crear nuevo producto
router.post('/crear', (req, res) => {
  const { codigo, producto, categoria_id, existencia_actual, precio } = req.body;
  db.run('INSERT INTO productos (codigo, producto, categoria_id, existencia_actual, precio) VALUES (?, ?, ?, ?, ?)', [codigo, producto, categoria_id, existencia_actual, precio], (err) => {
    if (err) throw err;
    res.redirect('/productos');
  });
});

// Editar producto
router.post('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { codigo, producto, categoria_id, existencia_actual, precio } = req.body;
  db.run('UPDATE productos SET codigo = ?, producto = ?, categoria_id = ?, existencia_actual = ?, precio = ? WHERE id = ?', [codigo, producto, categoria_id, existencia_actual, precio, id], (err) => {
    if (err) throw err;
    res.redirect('/productos');
  });
});

// Eliminar producto
router.post('/eliminar/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/productos');
  });
});

module.exports = router;

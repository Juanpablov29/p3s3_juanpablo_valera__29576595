// routes/categorias.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Listar categorías
router.get('/', (req, res) => {
  db.all('SELECT * FROM categorias', (err, rows) => {
    if (err) throw err;
    res.render('categorias', { categorias: rows });
  });
});

// Crear nueva categoría
router.post('/crear', (req, res) => {
  const { categoria } = req.body;
  db.run('INSERT INTO categorias (categoria) VALUES (?)', [categoria], (err) => {
    if (err) throw err;
    res.redirect('/categorias');
  });
});

// Editar categoría
router.post('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { categoria } = req.body;
  db.run('UPDATE categorias SET categoria = ? WHERE id = ?', [categoria, id], (err) => {
    if (err) throw err;
    res.redirect('/categorias');
  });
});

// Eliminar categoría
router.post('/eliminar/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM categorias WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/categorias');
  });
});

module.exports = router;

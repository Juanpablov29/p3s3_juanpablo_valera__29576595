// db/init.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL,
    producto TEXT NOT NULL,
    categoria_id INTEGER,
    existencia_actual INTEGER,
    precio REAL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
  )`);
});

db.close();

// db/init.js
const Database = require('better-sqlite3');
const db = new Database('./db/database.db', { verbose: console.log });

try {
  // Crear la tabla 'categorias' si no existe
  db.exec(`
    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoria TEXT NOT NULL
    )
  `);

  // Crear la tabla 'productos' si no existe
  db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL,
      producto TEXT NOT NULL,
      categoria_id INTEGER,
      existencia_actual INTEGER,
      precio REAL,
      FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    )
  `);
  
  console.log("Tablas creadas o ya existen.");
} catch (error) {
  console.error("Error al crear las tablas:", error);
} finally {
  db.close();
}

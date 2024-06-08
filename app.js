const express = require('express');
const app = express();
const port = 3000;

// Configurar EJS como el motor de plantillas
app.set('view engine', 'ejs');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta principal del dashboard
app.get('/dashboard', (req, res) => {
    res.render('index');
});

// Ruta para categorías
app.get('/dashboard/categorias', (req, res) => {
    const categorias = [
        { name: 'Electrónica', description: 'Encuentra los mejores gadgets y dispositivos.' },
        { name: 'Ropa', description: 'Moda para todas las estaciones y estilos.' },
        { name: 'Hogar', description: 'Artículos para hacer de tu casa un hogar.' },
        { name: 'Deportes', description: 'Equipamiento y ropa deportiva.' }
    ];
    res.render('categorias', { categorias });
});

app.listen(port, () => {
    console.log(`La aplicación se está ejecutando en http://localhost:${port}`);
});
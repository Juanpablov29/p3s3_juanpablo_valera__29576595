const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rutas
const categoriasRouter = require('./routes/categorias');
const productosRouter = require('./routes/productos');

app.use('/categorias', categoriasRouter);
app.use('/productos', productosRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

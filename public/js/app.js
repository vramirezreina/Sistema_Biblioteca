const express = require('express');
const path = require('path');
const app = express();

// Importar los árboles y funciones
const ArbolLibros = require('./arbolLibros');
const ArbolUsuarios = require('./arbolUsuarios');
const { prestarLibro, devolverLibro } = require('./prestamos');

// Crear instancias de árboles
const arbolLibros = new ArbolLibros();
const arbolUsuarios = new ArbolUsuarios();

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de inicio
app.get('/', (req, res) => {
  res.render('index', { libros: arbolLibros });
});

// Ruta para agregar un libro
app.get('/agregarLibro', (req, res) => {
  res.render('agregarLibro');
});

app.post('/agregarLibro', (req, res) => {
  const { id, titulo, autor, stock } = req.body;
  arbolLibros.insertarLibro(Number(id), titulo, autor, Number(stock));
  res.redirect('/');
});

// Ruta para agregar un usuario
app.get('/agregarUsuario', (req, res) => {
  res.render('agregarUsuario');
});

app.post('/agregarUsuario', (req, res) => {
  const { id, nombre, edad } = req.body;
  arbolUsuarios.insertarUsuario(id, nombre, Number(edad));
  res.redirect('/');
});

// Ruta para realizar un préstamo
app.post('/prestarLibro', (req, res) => {
  const { idLibro, idUsuario } = req.body;
  prestarLibro(Number(idLibro), idUsuario, arbolLibros, arbolUsuarios);
  res.redirect('/');
});

// Ruta para realizar una devolución
app.post('/devolverLibro', (req, res) => {
  const { idLibro, idUsuario } = req.body;
  devolverLibro(Number(idLibro), idUsuario, arbolLibros, arbolUsuarios);
  res.redirect('/');
});



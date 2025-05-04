const express = require('express');
const path = require('path');
const app = express();


const ArbolLibros = require('./arbolLibros');
const ArbolUsuarios = require('./arbolUsuarios');


const arbolLibros = new ArbolLibros();
const arbolUsuarios = new ArbolUsuarios();

const GestorPrestamos = require('./prestamos');
const gestorPrestamos = new GestorPrestamos();


const usuarios = [];

const port = 3000;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views')); 


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { arbolLibros: arbolLibros });
  });

  
  app.get('/agregarLibro', (req, res) => {
    res.render('agregarLibro', { libros: arbolLibros.mostrarLibros(), mensaje: null });
  });
  
  app.get('/agregarUsuario', (req, res) => {
    res.render('agregarUsuario', { mensaje: null, usuarios: usuarios });
  });
  
  
  app.post('/agregarUsuario', (req, res) => {
    const { id, nombre, edad } = req.body;
    arbolUsuarios.insertarUsuario(Number(id), nombre, Number(edad));  // Inserta el usuario en el árbol
    
    res.render('agregarUsuario', { 
      mensaje: 'Usuario creado correctamente', 
      usuarios: arbolUsuarios.mostrarUsuarios()  // Usar el método del árbol para mostrar los usuarios
    });
  });
  

  app.post('/agregarLibro', (req, res) => {
    const { id, titulo, autor, stock } = req.body;
    arbolLibros.insertarLibro(Number(id), titulo, autor, Number(stock));
  
    res.render('agregarLibro', { 
      libros: arbolLibros.mostrarLibros(), 
      mensaje: 'Libro agregado correctamente' 
    });
  });
  

  app.get('/prestarLibro', (req, res) => {
    res.render('prestarLibro', { 
      libros: arbolLibros.mostrarLibros(), 
      usuarios: arbolUsuarios.mostrarUsuarios(), 
      prestamos: gestorPrestamos.obtenerPrestamos() 
    });
  });
  
  app.post('/prestarLibro', (req, res) => {
    const { idLibro, idUsuario } = req.body;
  
    const libro = arbolLibros.buscarLibro(Number(idLibro));
    const usuario = arbolUsuarios.buscarUsuario(Number(idUsuario));
  
    if (!libro || !usuario) {
      return res.render('prestarLibro', {
        libros: arbolLibros.mostrarLibros(),
        usuarios: arbolUsuarios.mostrarUsuarios(),
        prestamos: gestorPrestamos.obtenerPrestamos(),
        mensaje: "Libro o usuario no encontrado"
      });
    }
  
    if (libro.stock > 0) {
      libro.stock -= 1; // Disminuir stock
      gestorPrestamos.realizarPrestamo(libro, usuario);
      res.render('prestarLibro', {
        libros: arbolLibros.mostrarLibros(),
        usuarios: arbolUsuarios.mostrarUsuarios(),
        prestamos: gestorPrestamos.obtenerPrestamos(),
        mensaje: "Préstamo realizado exitosamente"
      });
    } else {
      res.render('prestarLibro', {
        libros: arbolLibros.mostrarLibros(),
        usuarios: arbolUsuarios.mostrarUsuarios(),
        prestamos: gestorPrestamos.obtenerPrestamos(),
        mensaje: "No hay stock disponible"
      });
    }
  });


  app.post('/devolverLibro', (req, res) => {
    const { idLibro, idUsuario } = req.body;
    const devolucionExitosa = gestorPrestamos.devolverPrestamo(Number(idLibro), Number(idUsuario));

  
    if (devolucionExitosa) {
      arbolLibros.actualizarStockLibro(Number(idLibro), 1);
      res.render('prestarLibro', {
        libros: arbolLibros.mostrarLibros(),
        usuarios: arbolUsuarios.mostrarUsuarios(),
        prestamos: gestorPrestamos.obtenerPrestamos(),
        mensaje: 'Libro devuelto correctamente.'
      });
    } else {
      res.render('prestarLibro', {
        libros: arbolLibros.mostrarLibros(),
        usuarios: arbolUsuarios.mostrarUsuarios(),
        prestamos: gestorPrestamos.obtenerPrestamos(),
        mensaje: 'No se pudo devolver el libro. Verifica los datos.'
      });
    }
  });
  
  
  
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


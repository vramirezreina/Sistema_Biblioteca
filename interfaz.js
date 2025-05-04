const readline = require('readline');
const ArbolLibros = require('./arbolLibros');
const ArbolUsuarios = require('./arbolUsuarios');
const { prestarLibro, devolverLibro } = require('./prestamos');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Crear instancias de árboles
const arbolLibros = new ArbolLibros();
const arbolUsuarios = new ArbolUsuarios();

// Menú de opciones
function menu() {
  console.log("\n=== Sistema de Biblioteca ===");
  console.log("1. Insertar libro");
  console.log("2. Insertar usuario");
  console.log("3. Mostrar libros");
  console.log("4. Mostrar usuarios");
  console.log("5. Realizar préstamo");
  console.log("6. Realizar devolución");
  console.log("7. Salir");
  
  rl.question("Seleccione una opción: ", (opcion) => {
    switch(opcion) {
      case '1':
        insertarLibro();
        break;
      case '2':
        insertarUsuario();
        break;
      case '3':
        arbolLibros.mostrarLibros();
        menu();
        break;
      case '4':
        arbolUsuarios.mostrarUsuarios();
        menu();
        break;
      case '5':
        realizarPrestamo();
        break;
      case '6':
        realizarDevolucion();
        break;
      case '7':
        console.log("¡Hasta luego!");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        menu();
        break;
    }
  });
}

// Función para insertar libro
function insertarLibro() {
  rl.question("ID del libro: ", (id) => {
    rl.question("Título del libro: ", (titulo) => {
      rl.question("Autor del libro: ", (autor) => {
        rl.question("Stock del libro: ", (stock) => {
          arbolLibros.insertarLibro(Number(id), titulo, autor, Number(stock));
          console.log(`Libro "${titulo}" agregado exitosamente.`);
          menu();
        });
      });
    });
  });
}

// Función para insertar usuario
function insertarUsuario() {
  rl.question("ID del usuario: ", (id) => {
    rl.question("Nombre del usuario: ", (nombre) => {
      rl.question("Edad del usuario: ", (edad) => {
        arbolUsuarios.insertarUsuario(id, nombre, Number(edad));
        console.log(`Usuario "${nombre}" agregado exitosamente.`);
        menu();
      });
    });
  });
}

// Función para realizar préstamo
function realizarPrestamo() {
  rl.question("ID del libro a prestar: ", (idLibro) => {
    rl.question("ID del usuario: ", (idUsuario) => {
      prestarLibro(Number(idLibro), idUsuario, arbolLibros, arbolUsuarios);
      menu();
    });
  });
}

// Función para realizar devolución
function realizarDevolucion() {
  rl.question("ID del libro a devolver: ", (idLibro) => {
    rl.question("ID del usuario: ", (idUsuario) => {
      devolverLibro(Number(idLibro), idUsuario, arbolLibros, arbolUsuarios);
      menu();
    });
  });
}

// Iniciar el menú
menu();

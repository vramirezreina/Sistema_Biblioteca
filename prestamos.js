
class Prestamo {
  constructor(idLibro, tituloLibro, idUsuario, nombreUsuario, fecha) {
    this.idLibro = idLibro;
    this.tituloLibro = tituloLibro;
    this.idUsuario = idUsuario;
    this.nombreUsuario = nombreUsuario;
    this.fecha = fecha;
  }
}

class GestorPrestamos {
  constructor() {
    this.prestamos = [];
  }

  realizarPrestamo(libro, usuario) {
    const fecha = new Date().toLocaleDateString();
    const nuevoPrestamo = new Prestamo(libro.id, libro.titulo, usuario.id, usuario.nombre, fecha);
    this.prestamos.push(nuevoPrestamo);
  }

  obtenerPrestamos() {
    return this.prestamos;
  }

  devolverPrestamo(idLibro, idUsuario) {
    const index = this.prestamos.findIndex(p => p.idLibro === idLibro && p.idUsuario === idUsuario); // ✅ Correcto
    if (index !== -1) {
      this.prestamos.splice(index, 1);
      return true;
    }
    return false;
  }
  
  
  
}

// prestamo.js  (o tu controlador Express)
const grafo = require('./grafo');

// Cuando se hace el préstamo
grafo.addEdge(`u-${usuario.id}`, `b-${libro.id}`);

// Cuando se devuelve
grafo.removeEdge(`u-${usuario.id}`, `b-${libro.id}`);


module.exports = GestorPrestamos;

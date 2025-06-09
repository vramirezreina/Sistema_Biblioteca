class Grafo {
  constructor() {
    // relaciones[usuarioId][libroId] = { vecesPrestado, ultimaFecha }
    this.relaciones = {};
  }

  agregarPrestamo(idUsuario, idLibro, fecha) {
    if (!this.relaciones[idUsuario]) {
      this.relaciones[idUsuario] = {};
    }

    if (!this.relaciones[idUsuario][idLibro]) {
      this.relaciones[idUsuario][idLibro] = {
        vecesPrestado: 0,
        ultimaFecha: null,
      };
    }

    this.relaciones[idUsuario][idLibro].vecesPrestado += 1;
    this.relaciones[idUsuario][idLibro].ultimaFecha = fecha;
  }

  obtenerPrestamos() {
    return this.relaciones;
  }

  obtenerPrestamosPorUsuario(idUsuario) {
    return this.relaciones[idUsuario] || {};
  }
}

eliminarPrestamo(idUsuario, idLibro) {
  if (this.relaciones[idUsuario] && this.relaciones[idUsuario][idLibro]) {
    delete this.relaciones[idUsuario][idLibro];
    if (Object.keys(this.relaciones[idUsuario]).length === 0) {
      delete this.relaciones[idUsuario]; // eliminar usuario si no tiene más préstamos
    }
  }
}

module.exports = new Grafo(); // Instancia única

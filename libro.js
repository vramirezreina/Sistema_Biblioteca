class Libro {
  constructor(id, titulo, autor, stock) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.stock = stock;
    this.left = null;
    this.right = null;
  }
}


module.exports = Libro;
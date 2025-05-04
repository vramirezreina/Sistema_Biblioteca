// arbolLibros.js

const Libro = require('./libro');

class ArbolLibros {
  constructor() {
    this.root = null;
  }

  insertarLibro(id, titulo, autor, stock) {
    const nuevoLibro = new Libro(id, titulo, autor, stock);
    if (!this.root) {
      this.root = nuevoLibro;
      return;
    }

    const insertar = (node, nuevoLibro) => {
      if (nuevoLibro.id < node.id) {
        if (!node.left) node.left = nuevoLibro;
        else insertar(node.left, nuevoLibro);
      } else {
        if (!node.right) node.right = nuevoLibro;
        else insertar(node.right, nuevoLibro);
      }
    };

    insertar(this.root, nuevoLibro);
  }

  buscarLibro(id) {
    const buscar = (node, id) => {
      if (!node || node.id === id) return node;
      if (id < node.id) return buscar(node.left, id);
      return buscar(node.right, id);
    };

    return buscar(this.root, id);
  }

  mostrarLibros() {
    const libros = [];
    const recorridoInOrden = (node) => {
      if (node) {
        // Recorrer el subárbol izquierdo
        recorridoInOrden(node.left);
        
        // Agregar solo los datos que necesitamos (id, título, etc.)
        libros.push({
          id: node.id,
          titulo: node.titulo,
          autor: node.autor,
          stock: node.stock
        });
  
        // Recorrer el subárbol derecho
        recorridoInOrden(node.right);
      }
    };
  
    // Iniciar el recorrido en orden desde la raíz
    recorridoInOrden(this.root);
    
    return libros;
  }
  

  actualizarStockLibro(id, cantidad) {
    const libro = this.buscarLibro(id);
    if (libro) {
      libro.stock += cantidad;
      console.log(`Stock actualizado para "${libro.titulo}". Nuevo stock: ${libro.stock}`);
    } else {
      console.log("Libro no encontrado.");
    }
  }

  eliminarLibro(id) {
    const eliminar = (node, id) => {
      if (!node) return null;

      if (id < node.id) {
        node.left = eliminar(node.left, id);
      } else if (id > node.id) {
        node.right = eliminar(node.right, id);
      } else {
        // Caso 1: No tiene hijos
        if (!node.left && !node.right) return null;
        // Caso 2: Solo tiene un hijo
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // Caso 3: Tiene dos hijos
        let minNode = this._findMin(node.right);
        node.id = minNode.id;
        node.titulo = minNode.titulo;
        node.autor = minNode.autor;
        node.stock = minNode.stock;
        node.right = eliminar(node.right, minNode.id);
      }
      return node;
    };

    this.root = eliminar(this.root, id);
  }

  actualizarStockLibro(id, cantidad) {
    const libro = this.buscarLibro(id);
    if (libro) {
      if (libro.stock + cantidad < 0) {
        console.log("No hay stock suficiente.");
        return false;
      }
      libro.stock += cantidad;
      return true;
    }
    return false;
  }
  

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
}

module.exports = ArbolLibros;

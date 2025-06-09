const Usuario = require('./usuario');

class ArbolUsuarios {
    constructor() {
      this.root = null;
    }
  
    insertarUsuario(id, nombre, edad) {
      if (this.buscarUsuario(id)) return;
      const nuevoUsuario = new Usuario(id, nombre, edad);
      if (!this.root) {
        this.root = nuevoUsuario;
        return;
      }
  
      const insertar = (node, nuevoUsuario) => {
        if (nuevoUsuario.id < node.id) {
          if (!node.left) node.left = nuevoUsuario;
          else insertar(node.left, nuevoUsuario);
        } else {
          if (!node.right) node.right = nuevoUsuario;
          else insertar(node.right, nuevoUsuario);
        }
      };
  
      insertar(this.root, nuevoUsuario);
    }
  
    buscarUsuario(id) {
      const buscar = (node, id) => {
        if (!node || node.id === id) return node;
        if (id < node.id) return buscar(node.left, id);
        return buscar(node.right, id);
      };
  
      return buscar(this.root, id);
    }
  
    mostrarUsuarios() {
      const usuarios = [];  // Creamos un array para almacenar los usuarios
    
      const recorridoInOrden = (node) => {
        if (node) {
          recorridoInOrden(node.left);  // Recorrer el subárbol izquierdo
          // Agregar los datos del usuario al array
          usuarios.push({ id: node.id, nombre: node.nombre, edad: node.edad });
          recorridoInOrden(node.right);  // Recorrer el subárbol derecho
        }
      };
    
      recorridoInOrden(this.root);
      return usuarios;  // Devolver el array con los usuarios
    }
    

  
    eliminarUsuario(id) {
      const eliminar = (node, id) => {
        if (!node) return null;
  
        if (id < node.id) {
          node.left = eliminar(node.left, id);
        } else if (id > node.id) {
          node.right = eliminar(node.right, id);
        } else {
          if (!node.left && !node.right) return null;
          if (!node.left) return node.right;
          if (!node.right) return node.left;
          let minNode = this._findMin(node.right);
          node.id = minNode.id;
          node.nombre = minNode.nombre;
          node.edad = minNode.edad;
          node.right = eliminar(node.right, minNode.id);
        }
        return node;
      };
  
      this.root = eliminar(this.root, id);
    }
  
    _findMin(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  }

  // arbolUsuarios.js  (al finalizar insertarUsuario)
const grafo = require('./grafo');
// ...
insertar(this.root, nuevoUsuario);
grafo.addNode(`u-${id}`);

  module.exports = ArbolUsuarios;
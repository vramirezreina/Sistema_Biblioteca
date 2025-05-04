
class Usuario {
  constructor(id, nombre, edad) {
      this.id = id;
      this.nombre = nombre;
      this.edad = edad;
      this.left = null;  
      this.right = null;  
  }
}

module.exports = Usuario;

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }
  
  
    getFullName() {
      return console.log(`El nombre completo del usuario es: ${this.nombre} ${this.apellido}`);
    }
  
    addMascotas(nombreAnimal) {
      this.mascotas.push(nombreAnimal);
      return console.log('Las mascotas son: '),this.mascotas.map(y=>console.log(`·${y}`));
    }
  
    countMascotas() {
      return console.log(`La cantidad de Mascotas es: ${this.mascotas.length}`)
    }
    addBook(nombreLibro, nombreAutor) {
      this.libros.push({ nombre: nombreLibro, autor: nombreAutor })
  
      return this.libros;
    }
  
    getBookNames() {
      return console.log('Los nombres de los libros son: '),this.libros.map(x => console.log(`· ${x.nombre}`));
    }
  
  }
  
  const u1 = new Usuario('Daniel', 'Lobato', [{ nombre: 'Harry Potter', autor: 'JK Rowling' },
   { nombre: 'El Señor de los Anillos', autor: 'J. R. R. Tolkien' }], ['perro', 'gato']);
  
  u1.getFullName();
  u1.addMascotas('serpiente');
  u1.countMascotas();
  u1.addBook('El Hobbit', 'J. R. R. Tolkien');
  u1.getBookNames();
   
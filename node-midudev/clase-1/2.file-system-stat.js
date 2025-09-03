// fs => file-system
const fs = require('node:fs');

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // si es un fichero
  stats.isDirectory(), // si es undirectorio
  stats.isSymbolicLink(), // si es un enlace simbólico
  stats.size, // tamaño en bytes
);





const fs = require('node:fs')

// Crear un archivo 
const fileName = 'example.txt';
fs.writeFileSync(fileName, 'Hola, este es un archivo de ejemplo.');
// console.log("Archivo creado correctamente");

// Leer un archivo 
const content = fs.readFileSync(fileName, 'utf8');
console.log(content);

// Actualizar 
fs.appendFileSync(fileName, '\n\nEsta es una nueva linea\n');
console.log("Archivo actualizado correctamente.");

// Eliminar
fs.unlinkSync(fileName);
console.log("Archivo eliminado correctamente");

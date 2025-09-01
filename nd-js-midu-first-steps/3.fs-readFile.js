// Leer un archivo
const fs = require('node:fs');

// si solo se muestra de esta manera nos devolvera solo los bytes
// const text = fs.readFileSync('./archivo.txt');

// Síncronia
// Codificación para leer en archivo
// console.log('Leyendo el primer archivo');
// const text = fs.readFileSync('./archivo.txt', 'utf-8');
// console.log(text);

// console.log('Hacr cosas mientras lee el archivo...');


// console.log('Leyendo el segundo archivo');
// const secondText = fs.readFileSync('./archivo2.txt', 'utf-8');
// console.log(secondText);

// Asíncronia readFileSync => readFile y ademas de aceptar un callBack para saber que tarea a terminado

console.log('Leyendo el primer archivo');
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log(text);
});


console.log('Hacer cosas mientras lee el archivo...');


console.log('Leyendo el segundo archivo');
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log(text);
  
});
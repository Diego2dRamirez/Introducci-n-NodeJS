// MODULO NATIVO
// Devuelve inforación del sitema operativo  'os'
const os = require('node:os')

console.log('Información del sistema operativo:');
console.log('______________________');

console.log('Nombre del sistema operativo:', os.platform());
console.log('Versión del sistema operativo:', os.release());
console.log('Memoria Libre:', os.freemem() / 1024 / 1024);
console.log('Memoria Total:', os.totalmem() / 1024 / 1024);


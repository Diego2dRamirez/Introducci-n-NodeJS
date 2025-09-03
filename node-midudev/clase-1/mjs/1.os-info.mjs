// MODULO NATIVO
// Devuelve inforación del sitema operativo  'os'
import { platform, release, freemem, totalmem } from 'node:os';

console.log('Información del sistema operativo:');
console.log('______________________');

console.log('Nombre del sistema operativo:', platform());
console.log('Versión del sistema operativo:', release());
console.log('Memoria Libre:', freemem() / 1024 / 1024);
console.log('Memoria Total:', totalmem() / 1024 / 1024);


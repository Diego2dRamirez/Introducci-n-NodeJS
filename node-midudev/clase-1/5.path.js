const path = require('node:path');

// Barra separadora de carpetas segun SO
console.log(path.sep);

// unir rutas con path.join 
const filePath = path.join('content', 'subfolder', 'text.txt');
console.log(filePath);

// Nombre del fichero 
const base = path.basename('/tmp/2d-secret-files/password.txt');
console.log(base);

// Nombre del fichero sin la extención
const filename = path.basename('/tmp/2d-secret-files/password.txt', '.txt')
console.log(filename);

// Ver la extención de un archivo 
const extension = path.extname('my.super.image.png');
console.log(extension);

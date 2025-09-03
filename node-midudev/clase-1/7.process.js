// Recupera argumentos --> argumentos de entrada
console.log(process.argv);


// // Controlar eventos del Proceso
process.on('exit', () => {
  // Linpiar recursos
});

// Current working directory --> desde que carpeta estamos ejecutando el proceso
console.log(process.cwd());


// Platform --> variables de entorno
console.log(process.env.PEPITO);
// PEPITO=hola node --^



// Controlar procesos y su salida --> si hay alguna falla 
process.exit(1);

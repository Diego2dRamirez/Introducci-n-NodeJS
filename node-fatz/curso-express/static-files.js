const express = require('express')
const app = express();
const path = require('path')

// STATIC FILES ---> puede leer varios archivos a la vez leyendo una carpeta padre


// Archivos con la misma ruta o con el mismo nombre --> busca el primer archivo que encuentra o lo mustra
app.get('/note.txt', (req, res) => {
  res.send('esto no es un archivo')
})

// Middleware
// Nombre de la carpeta, la carpeta puede tener cualquier nombre
// app.use(express.static('./static'))

// Para no entrar en coflicto se especifia la ruta
// Siempre debera estar al ultimo para verificar si no coincide otro archivo igual a de la carpeta
app.use('/public', express.static('./static'))

// Se puede tener más de una carpeta estatica
// app.use('/uploads', express.static('./uploads'))

// Si el arichivo a levantar el servidor se encuentra dentro de una carpeta --> src/server.js <-- se debe ingresar:
app.use('/public', express.static(path.join(__dirname, './static')))


app.listen('3000', () => {
  console.log('Server on port 3000');
})
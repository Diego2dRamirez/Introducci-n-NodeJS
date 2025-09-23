// NodeJS --> http
const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
  // Leer un archivo
  const read = fs.createReadStream('./static/index.html')
  // Enviar el archivo
  read.pipe(res)
})

// server.listen('3000', () => {
//   console.log('Server on port 3000');
// });

// NodeJS --> express
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.sendFile('./static/index.html', {
    // indicar de donde proviene el archivo
    root: __dirname
  })
})

app.listen(3000, () => {
  console.log(`Server on port http://localhost:3000`);
})
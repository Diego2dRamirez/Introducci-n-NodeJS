const http = require('node:http');
const { findAvailablePort } = require('./10.free-port');

// const server = http.createServer((req,res)=> {
//   console.log('request recived');
//   res.end("Hola NodeJS")
// });

// server.listen(3001, () => {
//   console.log("Server listening on port 3001");
// });

// Si el puerto esta ocupado podemos usar el Puerto --> 0 solo para dessarrollo no para producción
// .address().port --> recupera el puerto 
// server.listen(0, () => {
//   console.log(`Server listening on port http://localhost:${server.address().port}`);
// });

// -------------------------------

// Función para poder encontrar un puerto disponible
// console.log(process.env)

// variable de entorno 
// PORT = 1235 node nombre_archivo
const desiredPort = process.env.PORT ?? 3001

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola Node.js')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
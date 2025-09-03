const http = require('node:http');
const { findAvailablePort } = require('./10.free-port');

const server = http.createServer((req,res)=> {
  console.log('request recived');
  res.end("Hola NodeJS")
});

// server.listen(3001, () => {
//   console.log("Server listening on port 3001");
// });

// Si el puerto esta ocupado podemos usar el Puerto --> 0 solo para dessarrollo no para producción
// .address().port --> recupera el puerto 
server.listen(0, () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`);
});
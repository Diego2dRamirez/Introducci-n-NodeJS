const http = require('node:http')

const desiredPort = process.env.PORT ?? 3001;

// req.url --> traer información de la request y empezar a descriminar la API ---> depediendo de los headers de las rutas actuara de forma distinta
const processRequets = (req, res) => {
  console.log("request received", req.url);
  res.end("Hola Node js")
}

const server = http.createServer(processRequets);

server.listen(desiredPort, () => {
  console.log(`Server listening on port http:/localhost:${desiredPort}`);

});
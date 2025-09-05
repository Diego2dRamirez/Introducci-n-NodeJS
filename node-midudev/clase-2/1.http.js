const http = require('node:http')

const desiredPort = process.env.PORT ?? 3001;

// req.url --> traer información de la request y empezar a descriminar la API ---> depediendo de los headers de las rutas actuara de forma distinta
const processRequets = (req, res) => {
  // console.log("request received", req.url);
  // creando rutas --> header 
  if (req.url === '/') {
    res.statusCode = 200 //ok
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end("<h1>Hola Node js --> Bienvenido a mi página de inicio</1>")
    // otras Rutas
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end("<h1>Contacto</h1>")
  } else {
    res.statusCode = 404 // Not Found
    res.end("<h1>404</h1>")

  }
}

const server = http.createServer(processRequets);

server.listen(desiredPort, () => {
  console.log(`Server listening on port http:/localhost:${desiredPort}`);

});
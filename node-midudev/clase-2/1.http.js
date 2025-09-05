const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3001;

// req.url --> traer información de la request y empezar a descriminar la API ---> depediendo de los headers de las rutas actuara de forma distinta
const processRequets = (req, res) => {
  // console.log("request received", req.url);

  //Cabeceras --> Headers
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  // creando rutas --> header 
  if (req.url === '/') {
    res.statusCode = 200 //ok
    res.end("<h1>Hola Node js --> Bienvenido a mi página de inicio</1>")
    // otras Rutas
  } else if (req.url === '/image.png') {
    fs.readFile('./OIP.png', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        // Headers --> Cabeceras
        res.setHeader('COntent-Type', 'image/png');
        res.end(data)
      }
    })

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
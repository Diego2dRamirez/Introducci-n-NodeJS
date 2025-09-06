// Creación de una API
const http = require('node:http');

// CommonJS --> modulos clásicos de node
const dittoJSON = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/html; utf-8');
          res.end("<h1>404</h1>")
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // Escuchar el evento data --> cuando queremos mandar información usamos el request
          req.on('data', chunk => {
            body += chunk.toString();
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
          })

          break;
        }
        default:
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/html; utf-8');
          res.end("<h1>404</h1>")
      }
  }
}

const sever = http.createServer(processRequest);
sever.listen(3001, () => {
  console.log("Server listening on port http://localhost:3001");
});
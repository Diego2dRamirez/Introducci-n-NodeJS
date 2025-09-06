const dittoJson = require('./pokemon/ditto.json')
const express = require('express');
const app = express();

app.disable('x-powered-by')
const PORT = process.env.PORT ?? 3001;

// app.use(express.json()) ---> etso es igual si usaramos los meddleware

app.use((req, res, next) => {
  // trackear la request a la base de datos
  // revisar si el usuario tiene cookies
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // solo llegan request que son POST y que tienen el header Content-Type: application/json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    // data.timestamp = Date.now()
    // mutar la request y meter la información en el req.body
    req.body = data
    next()
  })
})

app.get('/pokemon/ditto', (req, res) => {
  // res.send('<h1>Mi página</h1>');
  // res.json({ massage: "Hola Express" })
  res.send(dittoJson)
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
  // let body = ''
  // // Escuchar el evento data --> cuando queremos mandar información usamos el request
  // req.on('data', chunk => {
  //   body += chunk.toString();
  // })

  // req.on('end', () => {
  //   const data = JSON.parse(body);
  //   res.status(201).json(data)
  // })


})

// Status 404
app.use((req, res) => {
  res.status(404).send('<h1>404 Not</h1>')
})


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})
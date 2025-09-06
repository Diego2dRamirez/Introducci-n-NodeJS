const dittoJson = require('./pokemon/ditto.json')
const express = require('express');
const app = express();

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3001;

app.get('/pokemon/ditto', (req, res) => {
  // res.send('<h1>Mi página</h1>');
  // res.json({ massage: "Hola Express" })
  res.send(dittoJson)
});

app.post('/pokemon', (req, res) => {
  let body = ''
  // Escuchar el evento data --> cuando queremos mandar información usamos el request
  req.on('data', chunk => {
    body += chunk.toString();
  })

  req.on('end', () => {
    const data = JSON.parse(body);
    res.status(201).json(data)
  })
})


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})
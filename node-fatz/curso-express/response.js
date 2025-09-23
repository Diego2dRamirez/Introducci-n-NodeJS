const expres = require('express')

const app = expres()

app.get('/', (req, res) => {
  // Respuesta en formato texto
  res.send('Hello express')
})

app.get('/miarchivo', (req, res) => {
  //Leer un archivo --> img, pdf, audio, txt, video 
  res.sendFile('./logo_2d.png', {
    root: __dirname
  })
})

app.get('/json', (req, res) => {
  // Objeto JSON
  res.json({
    "name": "Diego",
    "lastName": "Ramírez",
    "age": 27,
    "address": {
      country: "México",
      city: "Puebla, pue"
    }
  })
})

app.get('/isAlive', (req, res) => {
  // Codigo de estado
  res.sendStatus(204)

})


app.listen('3000', () => {
  console.log('Server listening on port 3000');
})
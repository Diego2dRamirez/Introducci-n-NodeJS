const express = require('express')
const app = express()
const movies = require('./movies.json')

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hola NodeJS + Express' })
  //  res.send('¡Servidor Express activo!');
})

app.get('/movies', (req, res) => {
  res.json(movies)
})



const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server Listening on port http://loaclhost:${PORT}`);
})

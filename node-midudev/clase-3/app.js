const express = require('express')
const app = express()
const movies = require('./movies.json')

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hola NodeJS + Express' })
  //  res.send('¡Servidor Express activo!');
})

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  res.json(movies)
})

// Obtención de una Movie por su ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;

  const movie = movies.find( movie => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({message: 'Movie not found'})
})

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server Listening on port http://loaclhost:${PORT}`);
})

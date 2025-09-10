const express = require('express')
const app = express()
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movieSchema')

app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hola NodeJS + Express' })
  //  res.send('¡Servidor Express activo!');
})

// Se puede agreagr el origin de manera manual para indicar en que puerto se puede sinccronizar y evitar las CORS
const ACCEPTED_ORIGINS = [
  'http://localhost:3001',
  'http://localhost:8080',
  'http://movies.com',
  'http://2d.dev',
];

// Todos los recursos que sean MOVIES se identifican con /movies
// Recuperar todas las películas pero por género
app.get('/movies', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*' // Es universal y acepta todos los localhost:80080,19281928
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080') //Acepta solo si es el mismo localhost
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  // Se puede obtener los query params que se coloque en el url --- /movies?genre=Terror ---
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Obtención de una Movie por su ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;

  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' })
})

// Crear una Película
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  // const {
  //   id,
  //   title,
  //   year,
  //   director,
  //   duration,
  //   poster,
  //   genre,
  //   rate,
  // } = req.body;

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // base de datos
  const newMovie = {
    id: crypto.randomUUID(), //uuid v4
    // title,
    // year,
    // director,
    // duration,
    // poster,
    // genre,
    // rate: rate ?? 0, // datos no validados
    ...result.data // datos validados no es lo mismo que --❌req.body
  }

  // Esto no sería REST, porque se esta guardando el estado de la aplicación en memoría
  movies.push(newMovie);

  res.status(201).json(movies);
})

// Actualizar una propiedad de la película
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params

  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const upadateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = upadateMovie

  return res.json(upadateMovie)

})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(400).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })

})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE')
  }
  res.send(200)
})

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server Listening on port http://loaclhost:${PORT}`);
})


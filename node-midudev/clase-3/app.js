const express = require('express')
const app = express()
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie } = require('./schemas/movieSchema')

app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hola NodeJS + Express' })
  //  res.send('¡Servidor Express activo!');
})

// Todos los recursos que sean MOVIES se identifican con /movies
// Recuperar todas las películas pero por género
app.get('/movies', (req, res) => {
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


const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server Listening on port http://loaclhost:${PORT}`);
})

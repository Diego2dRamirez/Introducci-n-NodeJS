import express, { json } from 'express'
import cors from 'cors'
const app = express()
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from './schemas/movieSchema.js'

// Como leer un json en ESModules
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// como leer un json en ESModules recomendado por ahora --> creando un método require
import { createRequire } from 'node:module'
// direción del archivo actual
const requiere = createRequire(import.meta.url);
const movies = requiere('./movies.json');

app.disable('x-powered-by')
app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3001',
      'http://localhost:8080',
      'https://movies.com',
      'https://2d.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

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

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // base de datos
  const newMovie = {
    id: randomUUID(), //uuid v4
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
  const { id } = req.params
  const movieIndex = findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(400).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })

})

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server Listening on port http://loaclhost:${PORT}`);
})

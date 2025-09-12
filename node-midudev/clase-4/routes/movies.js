import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movieSchema.js'

import { createRequire } from 'node:module'
// como leer un json en ESModules recomendado por ahora --> creando un método require
// direción del archivo actual
const requiere = createRequire(import.meta.url)
const movies = requiere('../movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
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

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', (req, res) => {
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

moviesRouter.patch('/:id', (req, res) => {
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

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(400).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })

})
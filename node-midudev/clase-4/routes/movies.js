import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../schemas/movieSchema.js'
import { MovieModel } from '../models/movie.js'

// import { createRequire } from 'node:module'
// como leer un json en ESModules recomendado por ahora --> creando un método require
// direción del archivo actual
// const requiere = createRequire(import.meta.url)
// const movies = requiere('../movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  // Se puede obtener los query params que se coloque en el url --- /movies?genre=Terror ---
  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  res.json(movies)
})

moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModel.getById({ id })
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', async (req, res) => {
  const result = validateMovie(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = await MovieModel.create({ input: result.data })
  res.status(201).json(newMovie);
})

moviesRouter.patch('/:id', async (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params

  const upadateMovie = await MovieModel.update({ id, input: result.data })
  return res.json(upadateMovie)

})

moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await MovieModel.delete({ id })
  if (result === -1) {
    return res.status(400).json({ message: 'Movie not found' })
  }
  return res.json({ message: 'Movie deleted' })

})
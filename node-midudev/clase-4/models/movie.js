import { readJSON } from "../utils.js"
import { randomUUID } from 'node:crypto'
const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
      )
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find(movie => movie.id === id);
    return movie
  }

  static async create(input) {
    // base de datos
    const newMovie = {
      id: randomUUID(), //uuid v4
      ...input// datos validados no es lo mismo que --❌req.body
    }

    // Esto no sería REST, porque se esta guardando el estado de la aplicación en memoría
    movies.push(newMovie);
    return newMovie
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    const upadateMovie = {
      ...movies[movieIndex],
      ...input
    }
    return movies[movieIndex] = upadateMovie
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true

  }
}
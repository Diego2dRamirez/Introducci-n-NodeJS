import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Sci-Fi', 'Crime'])
  ),
  rate: z.number().min(0).max(10).default(5.5)
})

export function validateMovie(object) {
  // Devuelve sí hay un error o hay datos -->safeParse
  return movieSchema.safeParse(object)
}

export function validatePartialMovie(object) {
  // Partial --> las propiedades serán opcionales, decide si se requiere cambiar multiples propiedades o solo una... 
  return movieSchema.partial().safeParse(object)
}


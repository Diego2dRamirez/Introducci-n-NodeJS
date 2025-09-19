import { Router } from 'express'
import { MovieController } from '../controllers/moviesControllers.js'


// import { createRequire } from 'node:module'
// como leer un json en ESModules recomendado por ahora --> creando un método require
// direción del archivo actual
// const requiere = createRequire(import.meta.url)
// const movies = requiere('../movies.json')

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.patch('/:id', MovieController.update)

moviesRouter.delete('/:id', MovieController.delete)
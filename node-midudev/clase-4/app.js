import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
// Como leer un json en ESModules
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

// app.get('/', (req, res) => {
//   res.json({ message: 'Hola NodeJS + Express' })
//   //  res.send('¡Servidor Express activo!');
// })

// Todos los recursos que sean MOVIES se identifican con /movies
// Recuperar todas las películas pero por género
// app.get('/movies', todo)

// // Obtención de una Movie por su ID
// app.get('/movies/:id', todo)

// // Crear una Película
// app.post('/movies', todo)

// // Actualizar una propiedad de la película
// app.patch('/movies/:id', todo)

// app.delete('/movies/:id', todo)

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`);
})

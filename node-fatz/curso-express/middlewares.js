const expres = require('express')
const app = expres()

// Middleware una función antes de entrar a una ruta para hacer x acción
app.use((req, res, next) => {
  console.log(`Route: ${req.url}, Metodo: ${req.method}`);

  next()
})

app.get('/profile', (req, res) => {
  res.send("Profile Page")
})

app.get('/about', (req, res) => {
  res.send("Profile Page")
})

app.listen('3000', () => {
  console.log('Server listening on port 3000');
})
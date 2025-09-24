const expres = require('express')
const app = expres()

// Middleware una función antes de entrar a una ruta para hacer x acción --> puede colocarse donde sea los middlewares y después se ejecuta el método se ejecuta de forma de descendente
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

app.use((req, res, next) => {
  if (req.query.login === 'diego@gmail.com') {
    next();
  } else {
    res.send('No autorizado')
  }
})

app.get('/dashboard', (req, res) => {
  res.send("Dashboard Page")
})


app.listen('3000', () => {
  console.log('Server listening on port 3000');
})
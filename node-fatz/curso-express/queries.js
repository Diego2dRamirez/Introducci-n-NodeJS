const expres = require('express')
const app = expres()

app.get('/user/:username', (req, res) => {
  console.log(req.query);
  console.log(req.query.user);
  console.log(req.query.age);
  res.send(`Hello ${req.params.username}`)
})

app.get('/search', (req, res) => {
  if (req.query.q === 'javascript books') {
    res.send('Lista de libros de javascript')
  } else {
    res.send('Página norma')
  }
})

app.listen('3000', () => {
  console.log('Server listening on port 3000');
})
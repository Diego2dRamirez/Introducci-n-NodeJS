const express = require('express')
const app = express();

// Especifica que la ruta se escriba tal cual es. e.j. UserName debera escribirse tal cual
app.set('case sensitive routing', true)
// nombre de la aplicación -- valor
app.set('appName', 'Express Course')
app.set('port', 3000)

app.get('/', (req, res) => {
  res.send('Hello express')
})

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/UserName', (req, res) => {
  res.send('UserName')
})

app.get('/weather', (req, res) => {
  res.send('The current weather is Nice')
})


app.listen('3000', () => {
  console.log(`Server ${app.get('appName')} on port 3000`);
})
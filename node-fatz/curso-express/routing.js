const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hello express')
})

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/weather', (req, res) => {
  res.send('The current weather is Nice')
})

app.use((req, res) => {
  res.status(404).send('Page not found')
})

app.listen('3000', () => {
  console.log('Server on port 3000');
})
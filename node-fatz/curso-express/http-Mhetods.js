const express = require('express');
const app = express()

app.get('/products', (req, res) => {
  res.send('lista de productos')
})

app.post('/products', (req, res) => {
  res.send('creando producto')
})

app.put('/products', (req, res) => {
  res.send('actualizando producto')
})

app.patch('/products', (req, res) => {
  res.send('actualizando una parte del producto')
})

app.delete('/products', (req, res) => {
  res.send('eliminando producto')
})

app.listen('3000', () => {
  console.log('Server on port 3000');
})
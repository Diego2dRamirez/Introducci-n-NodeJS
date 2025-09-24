const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express.json())

const products = [
  {
    id: 1,
    name: 'laptop',
    price: 3000
  }
]

app.get('/products', (req, res) => {
  res.json(products)
})

app.post('/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body }
  products.push(newProduct)
  res.send(products)
})

app.put('/products', (req, res) => {
  res.send('Actualizando productos')
})

app.delete('/products', (req, res) => {
  res.send('Eleminando productos')
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const productId = products.find(product => product.id == id)
  if (!productId) return res.status(404).json({ message: "Product not found" })
  res.json(productId)
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);

})
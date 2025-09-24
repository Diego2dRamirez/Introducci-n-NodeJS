const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express.json())

let products = [
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

app.put('/products/:id', (req, res) => {
  const { id } = req.params

  const productId = products.find(product => product.id == id)
  if (!productId) return res.status(404).json({
    message: "Product not found"
  })
  const newData = req.body

  products = products.map(p => p.id === parseInt(id) ? { ...p, ...newData } : p)

  res.json(products)

  // const x = { a: 10, b: 20 }
  // let c = { ...x, b: 20 }
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params

  const productId = products.find(product => product.id == id)
  if (!productId) return res.status(404).json({
    message: "Product not found"
  })

  products = products.filter(p => p.id !== parseInt(id))

  res.json(products)
  res.status(204);
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
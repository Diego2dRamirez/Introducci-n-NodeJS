const express = require('express');
const app = express();
const cars = require('./cars.json');
const crypto = require('crypto')
const cors = require('cors')
const { validateCar, validatePartialCar } = require('./schemas/carsSchema');

app.disable('x-powered-by')
app.use(express.json())
app.use(cors())

app.get('/cars', (req, res) => {
  const { marca } = req.query

  if (marca) {
    const filteredCars = cars.filter(
      car => car.marca.toLocaleLowerCase() === marca.toLocaleLowerCase()
    )

    if (filteredCars.length === 0) {
      res.status(404).json({ message: 'Marca no encontrada' })
    }
    return res.json(filteredCars)
  }

  res.json(cars)
})

// Obtener un carro por ID
app.get('/cars/:id', (req, res) => {
  const { id } = req.params
  const car = cars.find(car => car.id === id)
  if (car) return res.json(car)
  res.status(404).json({ message: "Car not founc" })
})

// Agregar un nuevo carro
app.post('/cars', (req, res) => {
  const result = validateCar(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newCar = {
    id: crypto.randomUUID(),
    ...result.data
  }
  cars.push(newCar);
  res.status(201).json(newCar);

})

app.patch('/cars/:id', (req, res) => {
  const result = validatePartialCar(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params;
  const carIndex = cars.findIndex(car => car.id === id);

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Car not found' })
  }

  const updateCar = {
    ...cars[carIndex],
    ...result.data
  }

  cars[carIndex] = updateCar
  return res.json(updateCar)

})

app.delete('/cars/:id', (req, res) => {
  const { id } = req.params
  const carIndex = cars.findIndex(car => car.id === id)

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Car not found' })
  }

  cars.splice(carIndex, 1)
  return res.json({ message: 'Car delete' })
})


const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`);
})
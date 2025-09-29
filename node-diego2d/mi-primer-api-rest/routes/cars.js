import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { validateCar, validatePartialCar } from '../schemas/carsSchema.js'
import { createRequire } from 'node:module';


const require = createRequire(import.meta.url);
const cars = require('../cars.json')

export const carsRouter = Router();

// Obtener todos los carros
carsRouter.get('/', (req, res) => {
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
});

// Obtener un carro por ID
carsRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const car = cars.find(car => car.id === id)
  if (car) return res.json(car)
  res.status(404).json({ message: "Car not founc" })
});


// Agregar un nuevo carro
carsRouter.post('/', (req, res) => {
  const result = validateCar(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newCar = {
    id: randomUUID(),
    ...result.data
  }
  cars.push(newCar);
  res.status(201).json(newCar);

});

// Actualizar uno o varios datos de un carro
carsRouter.patch('/:id', (req, res) => {
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

});

// 
carsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const carIndex = cars.findIndex(car => car.id === id)

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Car not found' })
  }

  cars.splice(carIndex, 1)
  return res.json({ message: 'Car delete' })
})
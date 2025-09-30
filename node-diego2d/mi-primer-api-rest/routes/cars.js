import { Router } from 'express';
import { validateCar, validatePartialCar } from '../schemas/carsSchema.js';
import { CarModel } from '../models/car.js';

export const carsRouter = Router();

// Obtener todos los carros
carsRouter.get('/', async (req, res) => {
  const { marca } = req.query

  const cars = await CarModel.getAll({ marca })
  if (cars.length === 0) {
    return res.status(404).json({ message: 'Marca no encontrada' })
  }
  res.json(cars)
});

// Obtener un carro por ID
carsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const car = await CarModel.getByID({ id })
  if (car) return res.json(car)
  return res.status(404).json({ message: "Car not founc" })
});


// Agregar un nuevo carro
carsRouter.post('/', async (req, res) => {
  const result = validateCar(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newCar = await CarModel.create({ input: result.data })
  res.status(201).json(newCar);

});

// Actualizar uno o varios datos de un carro
carsRouter.patch('/:id', async (req, res) => {
  const result = validatePartialCar(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params;
  const updateCar = await CarModel.updateCar({ id, input: result.data })

  return res.json(updateCar)

});

// Eliminar un carro
carsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const carIndex = await CarModel.delete({ id })

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Car not found' })
  }

  return res.json({ message: 'Car delete' })
})
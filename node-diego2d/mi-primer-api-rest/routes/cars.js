import { Router } from 'express';
import { CarController } from '../controllers/CarsControllers.js';
export const carsRouter = Router();

// Obtener todos los carros
carsRouter.get('/', CarController.getAll);

// Obtener un carro por ID
carsRouter.get('/:id', CarController.getById);

// Agregar un nuevo carro
carsRouter.post('/', CarController.create);

// Actualizar uno o varios datos de un carro
carsRouter.patch('/:id', CarController.update);

// Eliminar un carro
carsRouter.delete('/:id', CarController.delete);
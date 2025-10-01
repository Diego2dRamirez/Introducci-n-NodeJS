import { readJSON } from '../utils.js';
import { randomUUID } from 'node:crypto';
const cars = readJSON('./cars.json')

export class CarModel {
  static async getAll({ marca }) {
    if (marca) {
      // const filteredCars = cars.filter(
      //   car => car.marca.toLocaleLowerCase() === marca.toLocaleLowerCase()
      // )

      return cars.filter(
        car => car.marca?.toLocaleLowerCase() === marca.toLocaleLowerCase()
      )
      // if (filteredCars.length === 0) {
      //  return res.status(404).json({ message: 'Marca no encontrada' })
      // }
      // return res.json(filteredCars)
    }
    return cars
  }

  static async getByID({ id }) {
    const car = cars.find(car => car.id === id)

    return car
  }

  static async create(input) {
    const newCar = {
      id: randomUUID(),
      ...input
    }
    cars.push(newCar);

    return newCar;
  }

  static async updateCar({ id, input }) {
    const carIndex = cars.findIndex(car => car.id === id);

    if (carIndex === -1) return res.status(404).json({ message: 'Car not found' })


    const updateCar = {
      ...cars[carIndex],
      ...input
    }

    return cars[carIndex] = updateCar
  }

  static async delete({ id }) {
    const carIndex = cars.findIndex(car => car.id === id)

    if (carIndex === -1) return false

    cars.splice(carIndex, 1)
    return true
  }
}
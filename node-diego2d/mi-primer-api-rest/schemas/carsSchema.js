const z = require('zod');

const carSchema = z.object({
  modelo: z.string({
    invalid_type_error: 'The Car model must be a string',
    required_error: 'The car model is required'
  }),
  marca: z.string({
    invalid_type_error: 'The Car brand must be a string',
    required_error: 'The car brand is required'
  }),
  imagen: z.url({
    message: 'Image must be a valid URL'
  }),
  motor: z.string({
    invalid_type_error: 'The Car engine must be a string',
    required_error: 'The car engine is required'
  }),
  precio: z.number().int().positive(),
  puntuacion: z.number().min(0).max(5).default(6.5)
})

function validateCar(object) {
  // Indica si hay un error o si hay datos faltantes
  return carSchema.safeParse(object)
}

module.exports = {
  validateCar,
}
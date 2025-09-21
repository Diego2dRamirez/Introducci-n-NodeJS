const express = require('express');
const app = express();
const cars = require('./cars.json');

app.disable('x-powered-by')
app.use(express.json())

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

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`);

})
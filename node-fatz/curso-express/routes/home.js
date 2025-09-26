const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello express')
})
router.get('/weather', (req, res) => {
  res.send('The current weather is Nice')
})

module.exports = router
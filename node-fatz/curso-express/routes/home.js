const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  const title = ' Mi página creada desde Express'
  const p = 'Soy una variable desde Express'

  res.render('view1', { title, p })
})
router.get('/weather', (req, res) => {
  res.render('view2')
})

module.exports = router
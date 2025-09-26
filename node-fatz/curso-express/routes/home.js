const { Router } = require('express')
const axios = require('axios')

const router = Router()

router.get('/', (req, res) => {
  let isActive = false
  const users = [
    {
      id: 1,
      name: "Diego",
      lastName: "Ramirez"
    },
    {
      id: 2,
      name: "Juan",
      lastName: "Ramirez"
    }
  ]
  const title = ' Mi página creada desde Express'
  const p = 'Soy una variable desde Express'

  res.render('view1', { title, p, isActive, users })
})
router.get('/weather', (req, res) => {
  res.render('view2')
})

router.get('/posts', async (req, res) => {
  // Servidor externo o una Base de datos
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

  res.render('posts', { posts: response.data })
})


module.exports = router
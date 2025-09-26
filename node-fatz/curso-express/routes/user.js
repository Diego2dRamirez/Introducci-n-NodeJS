const express = require('express')
const router = express.Router()

router.get('/about', (req, res) => {
  res.send('About')
})

router.get('/UserName', (req, res) => {
  res.send('UserName')
})

module.exports = router
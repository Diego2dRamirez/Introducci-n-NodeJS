const expres = require('express')
const app = expres()

app.get('/user/:username', (req, res) => {
  console.log(req.params);
  res.send(`Hello ${req.params.username}`)
})

app.get('/add/:x/:y', (req, res) => {
  const { x, y } = req.params
  res.send(`Result ${parseInt(x) + parseInt(y)}`)
})

app.get('/user/:username/photo', (req, res) => {
  if (req.params.username === 'diego') {
    return res.sendFile('./logo_2d.png', {
      root: __dirname
    })
  }

  res.send(`El usuario ${req.params.username} no tiene acceso`)
})

app.listen('3000', () => {
  console.log('Server listening on port 3000');
})
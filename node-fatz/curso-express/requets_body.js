const expres = require('express')
const app = expres()

// RESPONSE --> respuesta del servidor
// REQUEST --> el cliente manda información al servidor

app.use(expres.text({ type: 'text/plain' }))
app.use(expres.json())

app.post('/user', (req, res) => {
  // Enviar un texto plano / json 
  console.log('Texto recibido', req.body)
  console.log(req.body);
  res.send('Nuevo usuario creado')
})

app.listen('3000', () => {
  console.log('Server listening on port 3000');
})
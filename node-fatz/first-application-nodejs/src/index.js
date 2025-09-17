import express from 'express';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const app = express();

// obtener la ruta absoluta 
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, 'views'))
// motor de vistas o de plantillas
app.set('view engine', 'ejs')




app.get('/', (req, res) => {
  res.render('index')
})


const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`Server Listening on port http://loaclhost:${PORT}`);
})
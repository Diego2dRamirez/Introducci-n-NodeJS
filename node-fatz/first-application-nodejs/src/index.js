import express from 'express';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import indexRoutes from './routes/index.js'

const app = express();

// obtener la ruta absoluta 
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, 'views'))
// motor de vistas o de plantillas
app.set('view engine', 'ejs')

// Navegación
app.use(indexRoutes)


const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => {
  console.log(`Server Listening on port http://loaclhost:${PORT}`);
})
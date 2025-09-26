const express = require('express')
const app = express();
const path = require('node:path')
const HomeRoutes = require('./routes/home')
const UserRoutes = require('./routes/user')

// Configuración del motor ejs
app.set('view engine', 'ejs')

// views --> requerido por ejs <-- --> Donde estan los archivos
app.set('views', path.join(__dirname, './views'))

app.use(HomeRoutes)
app.use(UserRoutes)

app.listen('3000', () => {
  console.log(`Server ${app.get('appName')} on port 3000`);
})
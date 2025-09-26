const express = require('express')
const app = express();
const HomeRoutes = require('./home')
const UserRoutes = require('./user')

app.use(HomeRoutes)
app.use(UserRoutes)

app.listen('3000', () => {
  console.log(`Server ${app.get('appName')} on port 3000`);
})
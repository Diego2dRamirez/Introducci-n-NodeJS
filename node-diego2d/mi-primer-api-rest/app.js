const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ modelo:'Mustang 1998', marca: 'ford' })
})

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`);

})
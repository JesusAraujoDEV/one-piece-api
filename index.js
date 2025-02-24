const express = require('express');
const routerApi = require('./routes');


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('HOLA MUNDOOOO, primer get en express')
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

routerApi(app);

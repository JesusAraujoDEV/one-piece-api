const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error_handler');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('HOLA MUNDOOOO, primer get en express')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})


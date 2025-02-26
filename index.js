const express = require('express');
const routerApi = require('./routes');
const swaggerDocs = require('./swagger');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error_handler');
const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)){
      callback(null, true);
    } else{
      callback(new Error('No permitido por CORS'));
    }
  }
}
app.use(cors());

app.get('/', (req, res) => {
  res.send('HOLA MUNDOOOO, primer get en express')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Swagger
swaggerDocs(app, port);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})


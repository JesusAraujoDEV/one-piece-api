const express = require('express');

const frutasRouter = require('./frutas_router');
const piratesRouter = require('./pirates_router');
const usersRouter = require('./users_router');
const customersRouter = require('./customer_router');



function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/frutas', frutasRouter);
  router.use('/pirates', piratesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);

}

module.exports = routerApi;

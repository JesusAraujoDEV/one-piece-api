const express = require('express');

const frutasRouter = require('./frutas_router');
const piratesRouter = require('./pirates_router');
const usersRouter = require('./users_router');
const customersRouter = require('./customer_router');
const productsRouter = require('./product_router');
const categoryRouter = require('./category_router');
const orderRouter = require('./orders_router');
const authRouter = require('./auth_router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/frutas', frutasRouter);
  router.use('/pirates', piratesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoryRouter);
  router.use('/products', productsRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRouter);

}

module.exports = routerApi;

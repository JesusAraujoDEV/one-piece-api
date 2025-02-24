const frutasRouter = require('./frutas_router');
const piratesRouter = require('./pirates_router');
const usersRouter = require('./users_router');



function routerApi(app){
  app.use('/frutas', frutasRouter);
  app.use('/pirates', piratesRouter);
  app.use('/users', usersRouter);

}

module.exports = routerApi;

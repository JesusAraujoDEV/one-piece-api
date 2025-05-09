const { User, UserSchema } = require('./user_model');
const { Customer, CustomerSchema } = require('./customer_model');
const { serverUnavailable } = require('@hapi/boom');


function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = { setupModels };

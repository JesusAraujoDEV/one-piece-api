const { User, UserSchema } = require('./user_model');
const { Customer, CustomerSchema } = require('./customer_model');


function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models);
}

module.exports = { setupModels };

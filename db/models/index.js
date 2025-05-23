const { User, UserSchema } = require('./user_model');
const { Customer, CustomerSchema } = require('./customer_model');
const { Category, CategorySchema } = require('./category_model');
const { Product, ProductSchema } = require('./product_model');
const { Order, OrderSchema} = require('./order_model');
const { serverUnavailable } = require('@hapi/boom');
const { OrderProduct, OrderProductSchema } = require('./order-product_model');


function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);

  Category.associate(sequelize.models);
  Product.associate(sequelize.models);

  Order.associate(sequelize.models);
}

module.exports = { setupModels };

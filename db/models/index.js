const { User, UserSchema } = require('./user_model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
}

module.exports = { setupModels };

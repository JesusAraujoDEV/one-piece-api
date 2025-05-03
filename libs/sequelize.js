const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const { setupModels } = require('./../db/models');

const USER = encodeURIComponent(config.mysql.user);
const PASSWORD = encodeURIComponent(config.mysql.password);
const URI = `mysql://${USER}:${PASSWORD}@${config.mysql.host}:${config.mysql.port}/${config.mysql.database}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true,
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;

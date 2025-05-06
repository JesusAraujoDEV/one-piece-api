const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const { setupModels } = require('./../db/models');

const USER = encodeURIComponent(config.postgres.user);
const PASSWORD = encodeURIComponent(config.postgres.password);
const URI = `postgres://${USER}:${PASSWORD}@${config.postgres.host}:${config.postgres.port}/${config.postgres.database}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

module.exports = sequelize;

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.postgres.user);
const PASSWORD = encodeURIComponent(config.postgres.password);
const URI = `postgres://${USER}:${PASSWORD}@${config.postgres.host}:${config.postgres.port}/${config.postgres.database}`;

module.exports = {
    development: {
        url: URI,
        dialect: 'postgres',
    },
    production: {
        url: URI,
        dialect: 'postgres',
    },
}
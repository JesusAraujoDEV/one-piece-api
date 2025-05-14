const { Pool } = require('pg');

const {config} = require('./../config/config');

const options = {}

if (config.isProd){
    options.connectionString = config.db_url;
    options.ssl = {
        rejectUnauthorized: false
    }
}
else {
    const USER = encodeURIComponent(config.postgres.user);
    const PASSWORD = encodeURIComponent(config.postgres.password);
    const URI = `postgres://${USER}:${PASSWORD}@${config.postgres.host}:${config.postgres.port}/${config.postgres.database}`;
    options.connectionString = URI;
}

const pool = new Pool(options);

module.exports = pool;

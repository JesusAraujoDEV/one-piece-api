const { Pool } = require('pg');

const {config} = require('./../config/config');

let URI = '';

if (config.isProd){
    URI = config.db_url;
}
else {
    const USER = encodeURIComponent(config.postgres.user);
    const PASSWORD = encodeURIComponent(config.postgres.password);
    const URI = `postgres://${USER}:${PASSWORD}@${config.postgres.host}:${config.postgres.port}/${config.postgres.database}`;
}

const pool = new Pool({ connectionString: URI });

module.exports = pool;

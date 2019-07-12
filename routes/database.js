const { Pool, Client } = require('pg');
const config = require('../config');
const pool = new Pool({
    host: config.postgres.server,
    user: config.postgres.user,
    database: config.postgres.database,
    password: config.postgres.pass,
    port: config.postgres.port
});

const client = new Client({
    host: config.postgres.server,
    user: config.postgres.user,
    database: config.postgres.database,
    password: config.postgres.pass,
    port: config.postgres.port
})

module.exports = { pool, client };
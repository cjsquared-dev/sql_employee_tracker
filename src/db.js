const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: '1234',
    port: 5432,
});

client.connect();

module.exports = client;
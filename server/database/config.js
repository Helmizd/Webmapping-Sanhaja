const Pool = require('pg').Pool
const pool = new Pool({
  user: 'administrator',
  host: 'localhost',
  database: 'webMaping',
  password: '123456',
  port: 5432,
});

module.exports = pool
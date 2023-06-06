const {Pool} = require('pg')

const pool = new Pool({
  user: 'bootcamp',
  host: 'localhost',
  database: 'database_movie',
  password: 'fadila123'
})

module.exports = pool
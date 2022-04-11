const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Harsh@123",
  host: "localhost",
  port: 4500,
  database: "perntodo",
});

module.exports = pool;

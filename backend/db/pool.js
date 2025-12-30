const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "mern_project",
});

module.exports = pool;

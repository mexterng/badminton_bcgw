//provide function for database queries
const mysql = require('mysql2/promise');
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
      await connection.end();
  }
}

async function getConnection() {
  const connection = await mysql.createConnection(config.db);
  return connection;
}

module.exports = {
  query,
  getConnection
}
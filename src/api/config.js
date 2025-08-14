// provides the  connection configuration to the database
const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306,
    connectTimeout: 60000
  },
  listPerPage: 10, // number of items per page for pagination
};
module.exports = config;
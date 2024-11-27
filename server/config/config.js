require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'shopper',
    database: 'shopper',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
};

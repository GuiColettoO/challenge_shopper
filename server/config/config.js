require('dotenv').config({ override: false });

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'shopper',
    database: process.env.DB_NAME || 'shopper',
    host: process.env.DB_HOST || 'postgres',
    port: 5432,
    dialect: 'postgres',
  },
};

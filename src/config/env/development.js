/**
 * Development environment settings
 *
 */

module.exports = {
  port: 5200,
  prefix: '/api',
  postgresql: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.TILL_POS_PRODUCT_DB || 'till_pos_product',
    dialect: 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
};

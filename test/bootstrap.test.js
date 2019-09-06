const supertest = require('supertest');
const dotenv = require('dotenv');

const { setup } = require('../src/sql');

process.env.NODE_ENV = 'test'; // just in case if test started by `mocha`
/* Load config from .env file at very beginning of app */
dotenv.config();

const { start, lower, sequelize, models } = require('../app');

const request = supertest(require('../app').default);

before(done => {
  start(async () => {
    global.request = request;
    global.sequelize = sequelize;
    global.models = models;

    await setup(sequelize);
    done();
  });
});

after(done => {
  lower(done);
});

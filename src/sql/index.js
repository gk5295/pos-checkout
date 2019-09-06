/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const glob = require('glob'); // eslint-disable-line
const series = require('async/series'); // eslint-disable-line

module.exports = {
  setup: sequelize => {
    const seeds = glob.sync(path.join(process.cwd(), 'src/sql/seeds/*'));

    const queries = [...seeds].map(filename => fs.readFileSync(filename).toString());

    const functionsList = [];
    let queryFunction;

    queries.forEach(query => {
      queryFunction = next => {
        sequelize
          .query(query)
          .then(() => next())
          .catch(next);
      };

      functionsList.push(queryFunction);
    });

    return new Promise((resolve, reject) => {
      series(functionsList, err => {
        if (err) return reject(err);

        console.log('=========================== done ==============================');
        return resolve();
      });
    });
  },

  truncate: sequelize => {
    const tables = fs
      .readdirSync(`${__dirname}/tables`)
      .filter(f => f.includes('.sql'))
      .map(f => f.replace('.sql', ''));

    const query = `TRUNCATE ${tables.join(', ')} RESTART IDENTITY;`;

    return sequelize.query(query);
  }
};

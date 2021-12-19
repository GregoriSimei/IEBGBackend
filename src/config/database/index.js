const Sequelize = require('sequelize');
const dbConfig = require('./database');

const connection = new Sequelize(dbConfig);

try {
    connection.authenticate();
} catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
}

module.exports = connection;

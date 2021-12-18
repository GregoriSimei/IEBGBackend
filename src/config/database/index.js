const Sequelize = require('sequelize');
const dbConfig = require('./database');

const connection = new Sequelize(dbConfig);

try {
    connection.authenticate();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = connection;
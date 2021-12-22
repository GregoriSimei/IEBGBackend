const Sequelize = require('sequelize');
const dbConfig = require('./database');

const Dictionary = require('../../models/Dictionary');
const DictionaryLabels = require('../../models/DictionaryLabels');

const connection = new Sequelize(dbConfig);

Dictionary.init(connection);
DictionaryLabels.init(connection);
connection.sync();

DictionaryLabels.associate(connection.models);
Dictionary.associate(connection.models);

try {
    connection.authenticate();
} catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
}

module.exports = connection;

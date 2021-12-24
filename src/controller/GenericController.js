const { DataTypes } = require('sequelize');
const connection = require('../config/database');

module.exports = {
    async save(req, res) {
        const data = req.body;

        const table = req.params.table_name;
        const dictionaryTable = await module.exports.getDictionaryFromTableName(table);
        const modelTable = await module.exports
            .generateModelFromDictionary(table, dictionaryTable.toJSON());

        const response = data.id
            ? await modelTable.update(data, { where: { id: data.id } })
            : await modelTable.create(data);

        res.status(200).json(response);
    },

    async generateModelFromDictionary(tableName, dictionary) {
        const { labels } = dictionary;
        const modelStructure = await module.exports.generateModelStructure(labels);
        const model = await connection.define(tableName, modelStructure);
        await connection.sync(model);
        return model;
    },

    async generateModelStructure(labels) {
        const modelStructure = {};

        const labelsAvailablesType = {
            String: DataTypes.STRING,
            Boolean: DataTypes.BOOLEAN,
        };

        labels.forEach((label) => {
            modelStructure[label.name] = labelsAvailablesType[label.type];
        });

        return modelStructure;
    },

    async getDictionaryFromTableName(tableName) {
        const DictionaryModel = await module.exports.createDictionaryModel();
        const dictionaryFromName = await DictionaryModel
            .findOne({
                where: { table_name: tableName },
                include: 'labels',
            });
        return dictionaryFromName;
    },

    async createDictionaryModel() {
        const Dictionary = await connection.define(
            'dictionaries',
            { table_name: DataTypes.STRING },
        );
        const DictionaryLabel = await connection.define(
            'dictionary_labels',
            {
                name: DataTypes.STRING,
                type: DataTypes.STRING,
                ref: DataTypes.STRING,
                required: DataTypes.BOOLEAN,
                edit: DataTypes.BOOLEAN,
                hidden: DataTypes.BOOLEAN,
            },
        );
        Dictionary.hasMany(DictionaryLabel, { foreignKey: 'dictionary_id', as: 'labels' });
        // await connection.sync();
        return Dictionary;
    },

};

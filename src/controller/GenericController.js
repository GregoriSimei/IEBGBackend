const { DataTypes } = require('sequelize');
const connection = require('../config/database');

class GenericController {
    modelAlreadyCreated = {};

    save = async (req, res) => {
        const data = req.body;

        const table = req.params.table_name;
        const dictionaryTable = await this.getDictionaryFromTableName(table);
        const modelTable = await this.generateModelFromDictionary(table, dictionaryTable.toJSON());

        const response = data.id
            ? await modelTable.update(data, { where: { id: data.id } })
            : await modelTable.create(data);

        res.status(200).json(response);
    };

    generateModelFromDictionary = async (tableName, dictionary) => {
        let model = this.modelAlreadyCreated[tableName];

        if (!model) {
            const { labels } = dictionary;
            const modelStructure = await this.generateModelStructure(labels);
            model = await connection.define(tableName, modelStructure);
            this.modelAlreadyCreated[tableName] = model;
            await connection.sync(model);
        }

        return model;
    };

    generateModelStructure = async (labels) => {
        const modelStructure = {};

        const labelsAvailablesType = {
            String: DataTypes.STRING,
            Boolean: DataTypes.BOOLEAN,
        };

        labels.forEach((label) => {
            modelStructure[label.name] = labelsAvailablesType[label.type];
        });

        return modelStructure;
    };

    getDictionaryFromTableName = async (tableName) => {
        const DictionaryModel = await this.createDictionaryModel();
        const dictionaryFromName = await DictionaryModel
            .findOne({
                where: { table_name: tableName },
                include: 'labels',
            });
        return dictionaryFromName;
    };

    createDictionaryModel = async () => {
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
    };
}

module.exports = new GenericController();

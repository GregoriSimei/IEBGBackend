const dictionaryUtils = require('./utils/dictionaryUtils');

class GenericController {
    modelAlreadyCreated = {};

    save = async (req, res) => {
        const data = req.body;

        const table = req.params.table_name;
        const dictionaryTable = await dictionaryUtils.getDictionaryFromTableName(table);
        const modelTable = this.modelAlreadyCreated[table]
            ? this.modelAlreadyCreated[table]
            : await this.getNewModel(table, dictionaryTable.toJSON());

        const response = data.id
            ? await modelTable.update(data, { where: { id: data.id } })
            : await modelTable.create(data);

        res.status(200).json(response);
    };

    getNewModel = async (table, dictionary) => {
        const newModel = await dictionaryUtils
            .generateModelFromDictionary(table, dictionary);
        this.modelAlreadyCreated[table] = newModel;
        return newModel;
    };
}

module.exports = new GenericController();

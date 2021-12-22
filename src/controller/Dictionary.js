const DictionaryModel = require('../models/Dictionary');

module.exports = {

    async getAllOrOne(req, res) {
        const idToFind = req.query.id;

        const response = idToFind
            ? await DictionaryModel.findByPk(idToFind, {
                include: { association: 'labels' },
            })
            : await DictionaryModel.findAll();

        res.status(200).json(response);
    },

    async store(req, res) {
        const data = req.body;
        const response = await DictionaryModel.create(data);
        res.status(200).json(response);
    },

};

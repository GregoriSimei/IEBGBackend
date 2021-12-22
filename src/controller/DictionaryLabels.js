const DictionaryModel = require('../models/Dictionary');
const DictionaryLabelsModel = require('../models/DictionaryLabels');

module.exports = {

    async store(req, res) {
        const { dictId } = req.params;
        const data = req.body;

        const dictionary = await DictionaryModel.findOne({ id: dictId });

        if (!dictionary) {
            return res.status(400).json({ error: 'Dicionario nao exite' });
        }

        const dictionaryLabels = await DictionaryLabelsModel.create({
            ...data,
            dictionary_id: dictId,
        });

        return res.status(200).json(dictionaryLabels);
    },

};

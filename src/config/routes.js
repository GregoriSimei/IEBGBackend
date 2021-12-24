const express = require('express');

const router = express.Router();

const DictionaryController = require('../controller/Dictionary');
const DictionaryLabelsController = require('../controller/DictionaryLabels');
const GenericController = require('../controller/GenericController');

router.get('/', (req, res) => res.json({ funcio: 'nou' }));
router.post('/dictionary', DictionaryController.store);
router.get('/dictionary', DictionaryController.getAllOrOne);
router.post('/dictionary_label/:dictId', DictionaryLabelsController.store);
router.post('/generic/:table_name', GenericController.save);

module.exports = router;

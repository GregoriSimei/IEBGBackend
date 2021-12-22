const express = require('express');

const router = express.Router();

const DictionaryController = require('../controller/Dictionary');
const DictionaryLabelsController = require('../controller/DictionaryLabels');

router.get('/', (req, res) => res.json({ funcio: 'nou' }));
router.post('/dictionary', DictionaryController.store);
router.get('/dictionary', DictionaryController.getAllOrOne);
router.post('/dictionary_label/:dictId', DictionaryLabelsController.store);

module.exports = router;

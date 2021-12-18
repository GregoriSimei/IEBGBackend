const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ funcio: 'nou' })
});


module.exports = router;
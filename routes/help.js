const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/help');
});

module.exports = router;
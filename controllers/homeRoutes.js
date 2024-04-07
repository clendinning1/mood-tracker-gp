const router = require('express').Router();

// home page
router.get('/', async (req, res) => {
    res.render('homepage');
});

module.exports = router;
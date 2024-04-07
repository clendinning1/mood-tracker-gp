const router = require('express').Router();

// home page
router.get('/', async (req, res) => {
    res.render('homepage');
});

// login page
router.get('/login', async (req, res) => {
    res.render('login');
});

// mood page
router.get('/mood', async (req, res) => {
    res.render('moodpage');
});

module.exports = router;
// routes to webpages


const router = require('express').Router();

// home page
router.get('/', async (req, res) => {
    res.render('homepage');
});


// login page
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        // if already logged in, redirect to homepage
        res.redirect('/');
        return;
    }

    res.render('login');
});


// mood page
// TO DO: add auth middleware so you have to be logged in to enter info on this page
router.get('/moodpage', async (req, res) => {
    res.render('moodpage');
});

module.exports = router;
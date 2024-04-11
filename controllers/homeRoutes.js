// routes to webpages

const router = require('express').Router();
const authRedirect = require('../utils/auth');

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
router.get('/moodpage', authRedirect, async (req, res) => {

    

    res.render('moodpage');
});

module.exports = router;
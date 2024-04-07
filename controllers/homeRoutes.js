const router = require('express').Router();

// home page
router.get('/', async (req, res) => {
    res.render('homepage');
});


// login page
router.get('/login', async (req, res) => {
    // FOR SESSIONS:
    // if (req.session.logged_in) {
    //     // if already logged in, redirect to homepage
    //     res.redirect('/homepage');
    //     return;
    // }

    res.render('login');
});


// mood page
router.get('/mood', async (req, res) => {
    res.render('moodpage');
});

module.exports = router;
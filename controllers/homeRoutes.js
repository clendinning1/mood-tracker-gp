// routes to webpages

const router = require('express').Router();
const { MoodLog, User } = require('../models');
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

    try {
        // check for user login via session id
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: MoodLog }],
        });

        const user = userData.get({ plain: true });

        console.log(userData);

        res.render('moodpage', {
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }

});

module.exports = router;
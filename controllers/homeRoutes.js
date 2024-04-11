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
// TO DO: add withauth middleware so you have to be logged in to enter info on this page
function requireAuth(req, res, next) {
    if (req.session && req.session.user_id) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

router.get('/moodpage', requireAuth, async (req, res) => {
    try {
        console.log("Fetching mood logs...");
        const userId = req.session.user_id;

        const moodLogs = await MoodLog.findAll({
            where: { user_id: userId }
        });
        console.log("Mood logs:", moodLogs);

        const moodLogsData = moodLogs.map(moodLog => moodLog.toJSON());
        console.log("Mood logs data:", moodLogsData);

        res.render('moodpage', { logEntries: moodLogsData });
    } catch (error) {
        console.error('Error fetching mood logs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

router.post('/moodpage', async (req, res) => {
    try {
        const { mood } = req.body;

        if (!mood) {
            return res.status(400).json({ error: 'Mood is required' });
        }

        const newMoodLog = await MoodLog.create({
            mood: mood,
            date: new Date(),
            userId: req.session.user_id,
        });

        res.status(201).json(newMoodLog);
    } catch (error) {
        console.error('Error logging mood:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
// routes to webpages


const router = require('express').Router();
const {MoodLog, User} = require('../models');
 

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
// TO DO: add withauth middleware so you have to be logged in to enter info on this page
router.get('/moodpage', async (req, res) => {
    res.render('moodpage');
});

router.get('/moodpage', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Must be logged in to access mood logs' });
        }

        const userId = req.user.id;
        const moodLogs = await MoodLog.findAll({
            where: { userId },
            order: [['date', 'DESC']],
        });

        res.status(200).json(moodLogs);
    } catch (error) {
        console.error('Error fetching mood logs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/moodpage', async (req, res) => {
    try {
        const { mood } = req.body; 
        if (!req.user) {
            return res.status(401).json({ error: 'Must be logged in to log mood' });
        }

        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newMoodLog = await MoodLog.create({
            mood: mood,
            date: new Date(),
            UserId: userId,
        });

        res.status(201).json(newMoodLog);
    } catch (error) {
        console.error('Error logging mood:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
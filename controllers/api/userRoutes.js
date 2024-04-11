// routes for user login functionality
// used in public/js/login.js & logout.js

const router = require('express').Router();
const { User } = require('../../models');


// signup post route
router.post('/', async (req, res) => {
    console.log("signup post route 1");
    try {
        const userData = await User.create(req.body);

        console.log("signup post route 2");

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// login post route
router.post('/login', async (req, res) => {
    console.log("userroutes 0");
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        console.log("userroutes 1");

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect login, try again' });
            return;
        }

        console.log("userroutes 2");

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect login, try again' });
            return;
        }
        console.log("userroutes 3");

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged in' });
            console.log("Logged in through user routes!");
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


// logout post route
router.post('/logout', (req, res) => {
    console.log("logout post req 1");
    if (req.session.logged_in) {
        console.log("logout post req 2");
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        console.log("logout post req 3");
        res.status(404).end();
    }
    console.log("logout post req 4");
});



module.exports = router;
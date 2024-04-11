const authRedirect = (req, res, next) => {
    // function redirects to the login page when called
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = authRedirect;
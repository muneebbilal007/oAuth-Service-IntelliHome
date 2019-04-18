const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user){
        //* If user is not Logged In
        return res.redirect('/auth/login');
    } else {
        //* If Logged In
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    return res.render('profile', { user: req.user });
});

module.exports = router;
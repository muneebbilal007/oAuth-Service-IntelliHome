const router = require('express').Router();
const passport = require('passport');

/*
* @desc: Auth Route (/login)
* @param: req, res -> request and the response
? return: login route & render login template/view
*/
router.get('/login', (req, res) => {
    return res.render('login', { user: req.user });
});

/*
* @desc: Logout (/logout), Logout the user with PassportJs
* @param: req, res -> request and the response
? return: None
*/
router.get('/logout', (req, res) => {
    req.logOut();
    return res.redirect('/')
});

/*
* @desc: Auth Route for Google (/google) which will be handeled by PassportJs
*        Passport object is passed as a parameter to authenticate from google
*        The scope defines what information must be retrieved from the Google API
* @param: req, res -> request and the response
? return: route to google oAuth consent screen and return the scope with selected piece of Information
*/
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

/*
* @desc: Redirect (/google/redirect), Redirect the user after google consent screen
* @param: req, res -> request and the response
? return: None
*/
router.get('/google/redirect', passport.authenticate('google') , (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;
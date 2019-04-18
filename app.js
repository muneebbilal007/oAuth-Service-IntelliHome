const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const morgan = require('morgan');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const key = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//* Initiating the Express app instance
const app = express();

app.use(morgan('dev'));

//* Setting Up View Engine: EJS
app.set('view engine', 'ejs');

//* Setting Up Cookie Session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [key.session.cookieKey]
}));

//* Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//* Connecting to the MongoDB
mongoose.connect(key.mongoDB.mongoURI, {useNewUrlParser: true}, () => {
    console.log('Connection Established with MLab');
});

//? Mounting Point for the routes(authRoutes)
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

/*
* @desc: Setting the Home(/) route
* @param: req, res -> request and the response
* return: render home template
*/
app.get('/', (req, res) => {
    return res.render('home', { user: req.user });
});


/*
* Listen on the specified port
? port: 3000 or get the env port and starts the server
? and listen on that port.
*/
const port = 3000 || process.env.port;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
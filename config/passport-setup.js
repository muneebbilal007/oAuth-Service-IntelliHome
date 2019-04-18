const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/UserModel');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//? Specifying passport strategy to use passport-google-oauth2.0
passport.use(new GoogleStrategy({
    //* Options for the Google Strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //* Passport Callback Function
    //* Check if the user already exists in the database
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if (currentUser){
            //* User already exists
            done(null, currentUser);
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                done(null, newUser);
            });
        }
    });
}));
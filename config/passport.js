const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs'); // !!!
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, next) => {

  console.log("in config passport", email, password)
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      console.log("db err")
      next(err);
      return;
    }

    if (!foundUser) {
      console.log("no user err")
      next(null, false, { message: 'Incorrect username.' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      console.log("no coñpare err")
      next(null, false, { message: 'Incorrect password.' });
      return;
    }
    console.log("no user err")
    next(null, foundUser);
  });
}));
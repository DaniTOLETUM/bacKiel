// // routes/auth-routes.js

const express = require('express');
const router = new express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// // require the user model !!!!
const User = require('../models/user');

router.post('/create', (req, res, next) => {
  console.log("auth consolelog ", req.body);
  const { firstName, lastName, email, password, password2 } = req.body

  if (!firstName || !lastName || !email || !password) {
    res.json({ message: "provide all data please" });
    return;
  }

  if (password !== password2) {
    res.json({ message: "The passwords have to be equal" });
    return;
  }

  User.findOne({ email: email }, "_id", (err, foundUser) => {
    if (foundUser) {
      res.json({ message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      firstName,
      lastName,
      email,
      password: hashPass
    });

    theUser.save(err => {
      if (err) {
        res.json({ message: "Something went wrong saving user to Database" });
        return;
      } else {
        console.log("PEEEEEERRRRFECCCTTTT");
      }

      req.login(theUser, err => {
        if (err) {
          res.json({
            message: "Something went wrong with automatic login after signup"
          });
          return;
        }

        res.status(200).json(req.user);
      });
    });
  });
});
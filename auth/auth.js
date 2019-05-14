// // routes/auth-routes.js

const express = require("express");
const router = new express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// // require the user model !!!!
const User = require("../models/user");

//REGISTER
router.post("/create", (req, res, next) => {
  console.log("auth consolelog ", req.body);
  const {
    firstName,
    lastName,
    email,
    role,
    password,
    password2,
    userName
  } = req.body;

  if (password != password2) {
    console.log("contraseñas no coinciden");
    res.json({ message: "The passwords have to be equal" });
    return;
  }
  if (!firstName || !lastName || !email || !password) {
    res.json({ message: "provide all data please" });
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
      role,
      userName,
      password: hashPass
    });

    theUser.save(err => {
      if (err) {
        res.json({ message: "Something went wrong saving user to Database" });
        return;
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

//LOGIN
router.post("/login", (req, res, next) => {
  // console.log("ici", req.body)
  passport.authenticate("local", (err, theUser, failureDetails) => {
    console.log("the passpoert error...");
    console.log(err);
    console.log("the user...");
    console.log(theUser);
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.status(401).json({ message: "sorry, we coun't find that account" });
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Something went wrong logging in" });
        return;
      }
      // We are now logged in (notice req.user)

      res.status(200).json(req.user);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout(req.body, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("yeah");
    res.status(200).json({ message: "Log out Success" });
  });
});

// router.get("/loggedin", (req, res, next) => {
//   if (req.isAuthenticated()) {
//     res.status(200).json(req.user);
//     return;
//   }
//   res.status(403).json({ message: "Unauthorized" });
// });

module.exports = router;

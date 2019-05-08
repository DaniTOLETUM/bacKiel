require("../config/passport");
const userModel = require("../models/user");
const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const create = data => userModel.create(data);
const updateOne = (id, data) => userModel.updateOne({ _id: id }, data);
const deleteOne = id => userModel.deleteOne({ _id: id });
const getAll = () => userModel.find();

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

// router.post("/create", (req, res) => {
//   console.log(req.body)
//   const firstname = req.body.firstName;
//   const lastname = req.body.lastName;
//   const email = req.body.email;
//   const password = req.body.password;

//   if (!firstname || !lastname || !email || !password) {
//     res.status(400).json({ message: 'Provide all the data please' });
//     return;
//   }

//   userModel.findOne({ email }, (err, foundUser) => {

//     if (err) {
//       res.status(500).json({ message: "Username check went bad." });
//       return;
//     }

//     if (foundUser) {
//       res.status(400).json({ message: 'Username taken. Choose another one.' });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const aNewUser = new userModel({
//       firstname,
//       lastname,
//       email,
//       password: hashPass
//     });

//     aNewUser.save(err => {
//       if (err) {
//         res.status(400).json({ message: 'Saving user to database went wrong.' });
//         return;
//       }

//       // Automatically log in user after sign up
//       // .login() here is actually predefined passport method
//       req.login(aNewUser, (err) => {

//         if (err) {
//           res.status(500).json({ message: 'Login after signup went bad.' });
//           return;
//         }

//         // Send the user's information to the frontend
//         // We can use also: res.status(200).json(req.user);
//         res.status(200).json(aNewUser);
//       });
//     });
//   });
// });

router.patch("/:id", (req, res) => {
  updateOne(req.params.id, req.body)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db Error", dbErr }));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(dbRes => res.status(200).send(dbRess))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

module.exports = {
  router,
  deleteOne,
  updateOne,
  create,
  getAll
};

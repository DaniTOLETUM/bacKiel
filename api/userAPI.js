require("../config/passport");
const userModel = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const create = data => userModel.create(data);
const updateOne = (id, data) => userModel.updateOne({ _id: id }, data);
const deleteOne = id => userModel.deleteOne({ _id: id });
const getAll = () => userModel.find();
const getOne = id => userModel.findById({ _id: id });

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr =>
      res.status(500).send({ message: "Something went wrong", dbErr })
    );
});

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

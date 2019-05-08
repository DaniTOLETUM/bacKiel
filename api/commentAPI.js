const commentModel = require("../models/comment");
const express = require("express");
const router = express.Router();

const create = data => commentModel.create(data);
const updateOne = (id, data) => commentModel.updateOne({ _id: id }, data);
const deleteOne = id => commentModel.deleteOne({ _id: id });
const getAll = () => commentModel.find().populate("owner");

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.post("/create", (req, res) => {
  create(req.body)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
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

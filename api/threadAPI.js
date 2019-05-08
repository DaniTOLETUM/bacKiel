const threadModel = require("../models/thread");
const express = require("express");
const router = express.Router();

const create = data => threadModel.create(data);
const updateOne = (id, data) =>
  threadModel.updateOne({ _id: id }, { $push: { comments: data } });
const deleteOne = id => threadModel.deleteOne({ _id: id });
const getAll = () => threadModel.find().populate("comments");
const getOne = id => threadModel.findById({ _id: id }).populate("comments");

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

// router.post("/create", (req, res) => {
//   create(req.body)
//     .then(dbRes => res.status(200).send(dbRes))
//     .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
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
  getAll,
  getOne
};

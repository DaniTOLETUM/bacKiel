const tagModel = require("../models/tag");
const express = require("express");
const router = express.Router();

const create = data => tagModel.create(data);
const updateOne = (id, data) => tagModel.updateOne({ _id: id }, data);
const deleteOne = id => tagModel.deleteOne({ _id: id });
const getAll = () => tagModel.find();
const getOne = id => tagModel.findById({ _id: id });

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(res => res.status(200).send(res))
    .catch(err =>
      res.status(500).send({ message: "Oops something went wrong", err })
    );
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
  getAll,
  getOne
};

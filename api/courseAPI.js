const courseModel = require("../models/course");
const express = require("express");
const router = express.Router();
const categoryAPI = require("./categoryAPI");

const create = data => courseModel.create(data);
const updateOne = (id, data) => courseModel.updateOne({ _id: id }, data);
const deleteOne = id => courseModel.deleteOne({ _id: id });
const getAll = () => courseModel.find().populate("owner");

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.post("/create", (req, res) => {
  const { categoryId, data } = req.body;
  create(req.body)
    .then(dbRes => {
      console.log(dbRes);
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

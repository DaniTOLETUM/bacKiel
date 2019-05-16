const categoryModel = require("../models/category");
const express = require("express");
const router = express.Router();

const create = data => categoryModel.create(data);
const updateOne = (id, data) => categoryModel.updateOne({ _id: id }, data);
const deleteOne = id => categoryModel.deleteOne({ _id: id });
const getAll = () =>
  categoryModel
    .find()
    .populate("courses")
    .populate("tags");
const getOne = id => categoryModel.findById({ _id: id }).populate("courses");
const updateTagsOfOne = (id, data) =>
  categoryModel.updateOne({ _id: id }, { $push: { tags: data._id } });

const updateWithOneCourse = (id, courseId) =>
  categoryModel.updateOne({ _id: id }, { $push: { courses: courseId } });

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.post("/create", (req, res) => {
  console.log(req.body);
  create(req.body)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.patch("/:id", (req, res) => {
  updateOne(req.params.id, req.body)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db Error", dbErr }));
});

router.patch("/tag-upd/:id", (req, res) => {
  updateTagsOfOne(req.params.id, req.body)
    .then(result => res.status(200).send(result))
    .catch(err => console.log(err));
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
  getOne,
  updateWithOneCourse
};

const moduleModel = require("../models/module");
const express = require("express");
const router = express.Router();
const courseAPI = require("./courseAPI");

const create = data => moduleModel.create(data);
const updateOne = (id, data) => moduleModel.updateOne({ _id: id }, data);
const deleteOne = id => moduleModel.deleteOne({ _id: id });
const getAll = () => moduleModel.find().populate("teacher");
const getOne = id => moduleModel.findById({ _id: id }).populate("lessons");

const addLesson = (id, lessonId) =>
  moduleModel.updateOne({ _id: id }, { $push: { lessons: lessonId } });
// const getOne = id => courseModel.findById(id).populate("teacher");

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.post("/create", (req, res) => {
  create(req.body)
    .then(dbRes => {
      courseAPI
        .addModule(req.body.courseId, dbRes._id)
        .then(result => {
          res.status(200).send(dbRes._id);
        })
        .catch(error => console.log(error));
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
  getOne,
  addLesson
};

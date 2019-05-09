const courseModel = require("../models/course");
const express = require("express");
const router = express.Router();
const categoryAPI = require("./categoryAPI");
const threadAPI = require("./threadAPI");

const create = data => courseModel.create(data);

const getAllByCategory = category =>
  courseModel
    .find({ category })
    .populate("teacher")
    .populate({
      path: "thread",
      populate: { path: "comments", populate: { path: "owner" } }
    })
    .populate("courseModules");

const updateOne = (id, data) => courseModel.updateOne({ _id: id }, data);

const deleteOne = id => courseModel.deleteOne({ _id: id });

const addModule = (id, moduleId) =>
  courseModel.updateOne({ _id: id }, { $push: { courseModules: moduleId } });

const getAll = () =>
  courseModel
    .find()
    .populate("teacher")
    .populate({
      path: "thread",
      populate: { path: "comments", populate: { path: "owner" } }
    })
    .populate("courseModules");

const getOne = id =>
  courseModel
    .findById({ _id: id })
    .populate("teacher")
    .populate("thread");

router.get("/:category", (req, res) => {
  getAllByCategory(req.params.category)
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send(dbErr));
});

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
  create(req.body)
    .then(dbRes => {
      threadAPI
        .create({})
        .then(secondRes => {
          updateOne(dbRes._id, { thread: secondRes._id })
            .then(thirdRes => res.status(200).send("ok"))
            .catch(dberror => console.log(dberror));
        })
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr => res.status(500).send({ message: "Db error", dbErr }));
});

router.patch("/:id", (req, res) => {
  updateOne(req.params.id, req.body.courseModulesId)
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
  addModule
};

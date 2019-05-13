const lessonModel = require("../models/lesson");
const express = require("express");
const router = express.Router();
const userAPI = require("./userAPI");

const getAll = () => lessonModel.find().populate("tags");
const create = data => lessonModel.create(data);
const updateOne = (id, data) => lessonModel.updateOne({ _id: id }, data);
const deleteOne = id => lessonModel.deleteOne({ _id: id });
const getOne = id => lessonModel.findById({ _id: id });
const addTag = (id, tagId) =>
  lessonModel.updateOne({ _id: id }, { $push: { tags: tagId } });

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

router.patch("/add-tag", (req, res) => { });

router.post("/create", (req, res) => {
  console.log(req.body.teacher)
  create(req.body)
    .then(dbRes => {
      userAPI
        .addLesson(req.body.teacher, dbRes._id)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
      // moduleAPI
      //   .addLesson(req.body.moduleId, dbRes._id)
      //   .then(result => res.status(200).send(result))
      //   .catch(error => res.status(500).send(error));
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

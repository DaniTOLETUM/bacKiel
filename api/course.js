const express = require("express");
const router = new express.Router();
const courseModel = require("../models/course");

router.post("/", (req, res) => {
  console.log(req.body);
  courseModel
    .create(req.body)
    .then(dbSuccess => {
      res.status(200).json({ txt: "Course successfully created", dbSuccess });
    })
    .catch(dbError => {
      res
        .status(500)
        .json({ txt: "Invalid database server response", dbError });
    });
});

router.get("/", (req, res) => {
  courseModel
    .find()
    .populate("Category")
    .then(course => res.status(200).json({ course }))
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/:id", (req, res) => {
  courseModel
    .findById(req.params.id)
    .populate("Category")
    .then(product => res.status(200).json(product))
    .catch(dbErr => res.status(500).json(dbErr));
});

router.delete("/:id", (req, res) => {
  courseModel
    .findOneAndDelete({ _id: req.params.id })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => {
      console.log(dbErr);
      res.status(500).json(dbErr);
    });
});

module.exports = router;

const express = require("express");
const router = new express.Router();
const categoryModel = require("../models/category");

router.post("/", (req, res) => {
  categoryModel
    .create(req.body)
    .then(dbSuccess => {
      res.status(200).json({ txt: "category successfully created", dbSuccess });
    })
    .catch(dbError => {
      res
        .status(500)
        .json({ txt: "invalid database server response", dbError });
    });
});

router.get("/", (req, res) => {
  categoryModel
    .find()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(dbError =>
      res.status(500).json({ txt: "invalid database server response", dbError })
    );
});

router.delete("/:id", (req, res) => {
  categoryModel
    .findOneAndDelete({ _id: req.params.id })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});
module.exports = router;

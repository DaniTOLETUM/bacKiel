const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

router.post("/image", (req, res) => {
  const values = Object.values(req.files);
  console.log(values);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
  Promise.all(promises)
    .then(results => {
      console.log(results);
      res.status(200).send({ message: "Ok", results });
    })
    .catch(err => console.log(err));
});

module.exports = {
  router
};

require("dotenv").config();
require("./config/dbConnection");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(bodyParser.json());
// API Routers
const apiCourse = require("./api/course");
const apiCategory = require("./api/category");
app.use("/api/course", apiCourse);
app.use("/api/category", apiCategory);

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;

require("dotenv").config();
require("./config/mongoose-config");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
app.use(cors());
// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const categoryAPI = require("./api/categoryAPI").router;
const courseAPI = require("./api/courseAPI").router;
const userAPI = require("./api/userAPI").router;
app.use("/api/category", categoryAPI);
app.use("/api/user", userAPI);
app.use("/api/course", courseAPI);

module.exports = app;

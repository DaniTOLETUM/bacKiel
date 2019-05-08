require("dotenv").config();
require("./config/mongoose-config");
require("./config/passport")
// require("./config/mongo");
// require("./config/sessions");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

//Sessions--------------
const sessionStore = new session.MemoryStore();
const app = express();

// SESSIONS SETUP
app.use(
  session({
    cookie: { maxAge: 1800000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());
// 



const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

app.use(cors());
// Middleware Setup-------SERVER CONFIG
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// API ROUTERS--------------
const categoryAPI = require("./api/categoryAPI").router;
const courseAPI = require("./api/courseAPI").router;
const userAPI = require("./api/userAPI").router;
const auth = require("./auth/auth");

app.use("/api/category", categoryAPI);
app.use("/api/user", userAPI);
app.use("/api/course", courseAPI);
app.use("/api/auth", auth);

module.exports = app;

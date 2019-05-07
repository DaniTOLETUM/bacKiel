const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to the Database");
});

mongoose.connection.on("error", () => {
  console.error("Connection Error");
});

module.exports = mongoose.connection;

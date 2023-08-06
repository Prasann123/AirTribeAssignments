const express = require("express");
const routes = require("express").Router();
const { PORT } = require("./utils/constants");
const mongoose = require("mongoose");
const apiRoutes = require("./routes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(routes);

routes.get("/", (req, res) => {
  return res.status(200).send("Welcome to News API");
});
try {
  mongoose.connect(process.env.MONGO_DB_CRED, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected to db");
} catch (error) {
  console.log(error);
}
routes.use("/api", apiRoutes);
app.listen(PORT, (err) => {
  if (!err) {
    console.log("Started server");
  } else {
    console.log("Error Occured");
  }
});

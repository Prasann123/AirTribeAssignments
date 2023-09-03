const express = require("express");

const NewsRoutes = require("./NewsAPI-routes");

const router = express.Router();

router.use("/News", NewsRoutes);

module.exports = router;

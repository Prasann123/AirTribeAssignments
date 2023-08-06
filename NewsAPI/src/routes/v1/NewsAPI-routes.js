const express = require("express");
const { signin, signup } = require("../../controllers/auth-Controller");
const {
  getPreferences,
  putPreferences,
  getNews,
  postReadNews,
} = require("../../controllers/newsAPI-controller");
const {
  NewsMiddlewares,
  VerifyTokenMiddlewares,
} = require("../../middlewares/");
const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.get(
  "/preferences",
  VerifyTokenMiddlewares.verifyJwtToken,
  getPreferences
);

router.put(
  "/preferences",
  VerifyTokenMiddlewares.verifyJwtToken,
  putPreferences
);
router.get("/FetchNews", VerifyTokenMiddlewares.verifyJwtToken, getNews);

router.post("/:id/read", VerifyTokenMiddlewares.verifyJwtToken, postReadNews);

module.exports = router;

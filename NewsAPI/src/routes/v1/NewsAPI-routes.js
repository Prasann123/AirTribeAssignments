const express = require("express");
const { signin, signup } = require("../../controllers/auth-Controller");
const {
  getPreferences,
  putPreferences,
  getNews,
  postFavouriteSources,
  getFavoriteSources,
  getSearchNews,
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

router.post(
  "/:id/favSources",
  VerifyTokenMiddlewares.verifyJwtToken,
  postFavouriteSources
);
router.get(
  "/favSources",
  VerifyTokenMiddlewares.verifyJwtToken,
  getFavoriteSources
);
router.get(
  "/SearchNews/:Keywords",
  VerifyTokenMiddlewares.verifyJwtToken,
  getSearchNews
);

module.exports = router;

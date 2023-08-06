const { StatusCodes } = require("http-status-codes");
const { tokenResponseValidator } = require("../utils/validators");
const { country, preferences } = require("../utils/enums");
const user = require("../../models/user");
const urlSearchParams = require("url-search-params");
const NewsAPI = require("newsapi");
const { newsAPIPromise } = require("../utils/axiosHelper");

const getPreferences = (req, res) => {
  tokenResponseValidator(req, res);

  const { email } = req.query;
  if (!email && typeof email !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "invalid email or field is empty" });
  }
  if (email.toUpperCase() === req.user.email.toUpperCase()) {
    return res
      .status(StatusCodes.OK)
      .send({ userpreferences: req.user.preference });
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({ error: "Invalid user" });
  }
};

const putPreferences = async (req, res) => {
  try {
    tokenResponseValidator(req, res);

    const preferences = req.body.preference;

    const isallValid = preferences.every((pref) => preferences.includes(pref));

    if (!isallValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "invalid preferences" });
    }
    const userDetails = await user.findOne({ email: req.user.email });
    userDetails.preference = preferences;
    userDetails.updatedDate = Date.now();
    await userDetails.save();
    return res
      .status(StatusCodes.OK)
      .send({ message: "Preferences updated successfully" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error });
  }
};

const getNews = async (req, res) => {
  try {
    let newsResults = [];
    tokenResponseValidator(req, res);

    const userDetails = await user.findOne({ email: req.user.email });
    const searchPByreference = Object.values(userDetails.preference);
    const searchByCountry = userDetails.Country;
    for (const preference of searchPByreference) {
      const searchParams = new urlSearchParams({
        country: searchByCountry,
        category: preference,
        apikey: process.env.NEWS_API_KEY,
      });
      let urlAppend = `${process.env.NEWS_API_URL}?${searchParams}`;
      let resp = await newsAPIPromise(urlAppend);
      newsResults.push(resp);
    }

    return res.status(StatusCodes.OK).send(newsResults);
  } catch (error) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .send("Unable to fetch results from API");
  }
};
const postReadNews = async (req, res) => {
  try {
    tokenResponseValidator(req, res);
    const { id } = req.params;
    const readTitles = req.body.titles;

    const userTitlesUpdate = await user.findByIdAndUpdate(
      { _id: id },
      { $push: { readTitles: readTitles } },
      { new: true }
    );
    if (!userTitlesUpdate) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Invalid user" });
    }
    return res.status(StatusCodes.OK).send(userTitlesUpdate);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Unable to update Read Data" });
  }
};
module.exports = {
  getPreferences,
  putPreferences,
  getNews,
  postReadNews,
};

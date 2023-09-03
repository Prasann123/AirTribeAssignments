const { StatusCodes } = require("http-status-codes");
const { tokenResponseValidator } = require("../utils/validators");
const { country, preferences } = require("../utils/enums");
const user = require("../../models/user");
const urlSearchParams = require("url-search-params");
const NewsAPI = require("newsapi");
const { newsAPIPromise } = require("../utils/axiosHelper");
const cacheHelper = require("../utils/cacheHelper");
const cacheSchedule = require("node-schedule");

const cacheService = new cacheHelper();

const getPreferences = async (req, res) => {
  try {
    tokenResponseValidator(req, res);
    if (cacheService.has("getUserPreferences")) {
      const cacheDate = cacheService.get("getUserPreferences");
      if (cacheDate) {
        return res.status(StatusCodes.OK).send(cacheDate);
      }
    }
    const userDetails = await user.findOne({ email: req.user.email });
    cacheService.set("getUserPreferences", userDetails.preference);
    return res
      .status(StatusCodes.OK)
      .send({ userpreferences: userDetails.preference });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: "Unable to get preferences" });
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
    cacheService.set("getUserPreferences", userDetails.preference);
    cacheService.del("getUserNews");
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
    if (cacheService.has("getUserNews")) {
      const cacheDate = cacheService.get("getUserNews");
      if (cacheDate) {
        return res.status(StatusCodes.OK).send(cacheDate);
      }
    }

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
      newsResults.push(...resp.articles);
    }
    cacheService.set("getUserNews", newsResults);
    return res.status(StatusCodes.OK).send(newsResults);
  } catch (error) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .send("Unable to fetch results from API");
  }
};
const postFavouriteSources = async (req, res) => {
  try {
    tokenResponseValidator(req, res);
    const { id } = req.params;
    const sourceIds = req.body.sourceIds;

    const userSourceIdsUpdate = await user.findByIdAndUpdate(
      { _id: id },
      { $push: { readSourceIds: sourceIds } },
      { new: true }
    );
    if (!userSourceIdsUpdate) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Invalid user" });
    }

    return res.status(StatusCodes.OK).send(userSourceIdsUpdate);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Unable to update Read Data" });
  }
};
const getFavoriteSources = async (req, res) => {
  try {
    let newsResults = [];
    tokenResponseValidator(req, res);
    const userDetails = await user.findOne({ email: req.user.email });
    const searchPSourceIds = Object.values(userDetails.readSourceIds);
    for (const preference of searchPSourceIds) {
      const searchParams = new urlSearchParams({
        sources: preference,
        apikey: process.env.NEWS_API_KEY,
      });
      let urlAppend = `${process.env.NEWS_API_URL}?${searchParams}`;
      let resp = await newsAPIPromise(urlAppend);
      newsResults.push(...resp.articles);
    }
    return res.status(StatusCodes.OK).send(newsResults);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: `Unable to Read Data  ${error}` });
  }
};
const getSearchNews = async (req, res) => {
  try {
    let newsResults = [];
    tokenResponseValidator(req, res);
    const { Keywords } = req.params;
    if (!Keywords) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: `Incorrect input  ${error}` });
    }
    let splitKeyWords = Keywords.includes("&")
      ? Keywords.split("&")
      : [Keywords];
    for (const searchKey of splitKeyWords) {
      const searchParams = new urlSearchParams({
        q: searchKey,
        apikey: process.env.NEWS_API_KEY,
      });
      let urlAppend = `${process.env.NEWS_API_URL}?${searchParams}`;
      let resp = await newsAPIPromise(urlAppend);
      newsResults.push(...resp.articles);
    }
    return res.status(StatusCodes.OK).send(newsResults);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error });
  }
};
module.exports = {
  getPreferences,
  putPreferences,
  getNews,
  postFavouriteSources,
  getFavoriteSources,
  getSearchNews,
};

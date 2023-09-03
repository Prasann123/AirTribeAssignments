const jwt = require("jsonwebtoken");
const user = require("../../models/user");
const { StatusCodes } = require("http-status-codes");

const validateLogin = (req, res, next) => {};
const verifyJwtToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      "Generate a private key",
      function (err, value) {
        if (err) {
          res.user = undefined;
          res.status(StatusCodes.BAD_REQUEST).send("Invalid Token");
          next();
        } else {
          user
            .findOne({
              _id: value.id,
            })
            .then((user) => {
              req.user = user;
              next();
            })
            .catch((err) => {
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
            });
        }
      }
    );
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};

module.exports = { verifyJwtToken, validateLogin };

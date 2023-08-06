const { StatusCodes } = require("http-status-codes");

const tokenResponseValidator = (req, res) => {
  if (!req.user && req.message) {
    return res.status(StatusCodes.FORBIDDEN).send({ message: req.message });
  }
  if (!req.user && req.message == null) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Invalid jwt token" });
  }
};

module.exports = {
  tokenResponseValidator,
};

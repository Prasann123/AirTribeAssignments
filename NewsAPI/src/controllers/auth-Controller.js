const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../../models/user");

var signup = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 8);
  let Country = req.body.Country;
  let preference = req.body.preference;

  const User = new user({
    username: username,
    email: email,
    password: password,
    Country: Country,
    preference: preference,
  });

  User.save()
    .then((date) => {
      return res.status(StatusCodes.OK).send("User registered successfully");
    })
    .catch((err) => {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(`User registration failed ${err}`);
    });
};

var signin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let userCheck = user.findOne({ email: email });
  user
    .findOne({
      email: email,
    })
    .then((user) => {
      var isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(StatusCodes.UNAUTHORIZED).send({
          accessToken: null,
          message: "invalid request",
        });
      }
      var jwtToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return res.status(StatusCodes.OK).send({
        user: {
          user: user._id,
          email: user.email,
          username: user.username,
        },
        message: "Login successful",
        accessToken: jwtToken,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: err,
        });
      }
    });
};

module.exports = {
  signup,
  signin,
};

const { country, preferences } = require("../src/utils/enums");
const mongoose = require("mongoose"),
  //schema is the structure in which we store in db
  Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is not provided"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists in db"],
    lowercase: true,
    trim: true,
    required: [true, "Email is not provided"],
    validate: {
      validator: function (x) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
      },
      message: "Invalid Email format",
    },
  },
  password: {
    type: String,
    required: "Password not provided",
  },
  Country: {
    type: String,
    enum: country,
    required: "Country not provided",
  },
  preference: [
    {
      type: String,
      enum: Object.values(preferences),
      required: "preference not provided",
    },
  ],
  readSourceIds: [
    {
      type: String,
      default: [],
    },
  ],
  favouriteSourceIds: [
    {
      type: String,
      default: [],
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});
// because of this being model it is exported as model instead of actual object or function

module.exports = mongoose.model("user", userSchema);

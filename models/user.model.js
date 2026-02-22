const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: [3, "First Name should be at least 3 characters long"],
  },
  lastName: {
    type: String,
    minlength: [4, "Last Name should be at least 4 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email should be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
  );
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

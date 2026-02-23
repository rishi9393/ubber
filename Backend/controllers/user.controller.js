const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const isEmpty = require("validator/lib/isEmpty");
const { validationResult } = require("express-validator");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { fullname, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.registerUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  console.log(user);

  const token = user.generateAuthToken();
  res.status(201).json({
    token,
    user,
  });
};

module.exports = { registerUser };

const userModel = require("../models/user.model");

const registerUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    fullName: {
      firstName: firstname,
      lastName: lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports = { registerUser };

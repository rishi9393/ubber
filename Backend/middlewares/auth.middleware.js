const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.header.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id)

    req.user = user;
    next();
  }catch (err) {
    return res.status(401).json({
      message: "Token is not valid",
    });
  }
};

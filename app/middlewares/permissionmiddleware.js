const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const {
  unauthorized,
  permissiondenied,
} = require("../utils/responsehandler/responsehandler");

const permissionmiddleware = async (req, res, next) => {
  const user = res.user;
  if (user.user_role === "librarian") {
    return next();
  }
  return permissiondenied(res, "Permission Denied");
};

module.exports = permissionmiddleware;

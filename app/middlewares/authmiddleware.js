const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { unauthorized } = require("../utils/responsehandler/responsehandler");

const authMiddleware = async (req, res, next) => {
  if (req.headers && req.headers) {
    const authorization = req.headers.secret_key;
    let decoded;
    try {
      decoded = await jwt.verify(authorization, process.env.ACCESS_SECRET_KEY);
    } catch (e) {
      return unauthorized(res, "Unauthorized");
    }
    let id = decoded._id;
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      res.user = user;
      return next();
    }
    return unauthorized(res, "Unauthorized");
  } else {
    res.status(401).json({ error: true, message: "Unauthorized" });
  }
};

module.exports = authMiddleware;

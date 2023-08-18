const express = require("express");
const userRouter = express.Router();
const UserConroller = require("../../app/controllers/usercontroller");
const permissionmiddleware = require("../../app/middlewares/permissionmiddleware");
const authMiddleware = require("../../app/middlewares/authmiddleware");

userRouter.post("/register", UserConroller.singnUpUser);
userRouter.post("/signin", UserConroller.loginUser);
userRouter.get("/logout", UserConroller.logout);
userRouter.get(
  "/users",
  [authMiddleware, permissionmiddleware],
  UserConroller.getUsers
);

userRouter.put("/:id", [authMiddleware], UserConroller.updateUser);

userRouter.get("/:id", UserConroller.userDetail);

module.exports = userRouter;

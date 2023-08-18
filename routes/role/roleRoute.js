const express = require("express");
const roleRouter = express.Router();
const RoleController = require("../../app/controllers/rolecontroller");
const authMiddleware = require("../../app/middlewares/authmiddleware");
const permissionmiddleware = require("../../app/middlewares/permissionmiddleware");

roleRouter.post(
  "/",
  [authMiddleware, permissionmiddleware],
  RoleController.createRole
);
roleRouter.get(
  "/",
  [authMiddleware, permissionmiddleware],
  RoleController.getRoles
);
roleRouter.delete(
  "/",
  [authMiddleware, permissionmiddleware],
  RoleController.deleteRole
);

module.exports = roleRouter;

const express = require("express");
const imageRouter = express.Router();
const ImageController = require("../../app/controllers/uploadimagecontroller");
const authMiddleware = require("../../app/middlewares/authmiddleware");
const permissionmiddleware = require("../../app/middlewares/permissionmiddleware");

imageRouter.post(
  "/image",
  [authMiddleware, permissionmiddleware],
  ImageController.uploadImage
);

module.exports = imageRouter;

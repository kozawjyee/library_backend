const express = require("express");
const categoryRoute = express.Router();
const BookController = require("../../app/controllers/bookcontroller");
const BookCategoryController = require("../../app/controllers/bookcategorycontroller");
const authMiddleware = require("../../app/middlewares/authmiddleware");
const permissionmiddleware = require("../../app/middlewares/permissionmiddleware");

categoryRoute.post(
  "/",
  [authMiddleware, permissionmiddleware],
  BookCategoryController.createCategory
);
categoryRoute.get("/", [authMiddleware], BookCategoryController.getCategories);
categoryRoute.delete(
  "/:id",
  [authMiddleware, permissionmiddleware],
  BookCategoryController.deleteCategory
);

module.exports = categoryRoute;

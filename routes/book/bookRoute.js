const express = require("express");
const bookRouter = express.Router();
const BookController = require("../../app/controllers/bookcontroller");
const BookCategoryController = require("../../app/controllers/bookcategorycontroller");
const authMiddleware = require("../../app/middlewares/authmiddleware");
const permissionmiddleware = require("../../app/middlewares/permissionmiddleware");

bookRouter.post(
  "/",
  [authMiddleware, permissionmiddleware],
  BookController.createBook
);
bookRouter.get("/", [authMiddleware], BookController.getAllBooks);
bookRouter.get("/:id", [authMiddleware], BookController.bookDetail);
bookRouter.put(
  "/:id",
  [authMiddleware, permissionmiddleware],
  BookController.updateBook
);
bookRouter.delete(
  "/:id",
  [authMiddleware, permissionmiddleware],
  BookController.deleteBook
);

bookRouter.post(
  "/category",
  [authMiddleware, permissionmiddleware],
  BookCategoryController.createCategory
);
bookRouter.get(
  "/category",
  [authMiddleware, permissionmiddleware],
  BookCategoryController.getCategories
);
bookRouter.delete(
  "/category/:id",
  [authMiddleware, permissionmiddleware],
  BookCategoryController.deleteCategory
);

module.exports = bookRouter;

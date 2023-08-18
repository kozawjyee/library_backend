const express = require("express");
const borrowRouter = express.Router();

const BorrowController = require("../../app/controllers/borrowedbookcontroller");
const authMiddleware = require("../../app/middlewares/authmiddleware");
const permissionmiddleware = require("../../app/middlewares/permissionmiddleware");

borrowRouter.post("/", authMiddleware, BorrowController.createBorrow);
borrowRouter.get(
  "/",
  [authMiddleware, permissionmiddleware],
  BorrowController.getBorrow
);
borrowRouter.get("/:id", authMiddleware, BorrowController.borrowDetail);
borrowRouter.put(
  "/:id",
  [authMiddleware, permissionmiddleware],
  BorrowController.endBorrow
);
borrowRouter.put(
  "/:id",
  [authMiddleware, permissionmiddleware],
  BorrowController.updaeBorrow
);

module.exports = borrowRouter;

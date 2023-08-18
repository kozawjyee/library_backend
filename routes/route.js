const express = require("express");
const roleRouter = require("./role/roleRoute");
const userRouter = require("./user/userRoute");
const bookRouter = require("./book/bookroute");
const borrowRouter = require("./borrow/borrowRoute");
const imageRouter = require("./image/imageRoute");
const categoryRoute = require("./book/categoryRoute");
const router = express.Router();

router.use("/role", roleRouter);
router.use("/auth", userRouter);
router.use("/book", bookRouter);
router.use("/bookcategory", categoryRoute);
router.use("/borrow", borrowRouter);
router.use("/upload", imageRouter);

module.exports = router;

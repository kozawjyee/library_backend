const BorrowedBookModel = require("../models/BorrowBook");
const UserModel = require("../models/UserModel");
const BookModel = require("../models/BookModel");
const {
  internalServerError,
  badRequrest,
  created,
  successful,
} = require("../utils/responsehandler/responsehandler");

const createBorrow = async (req, res) => {
  const { book_id, user_id, date, ended_date, is_ended, dead_line } = req.body;

  try {
    const book = await BookModel.findOne({ _id: book_id });
    if (!book) {
      return badRequrest(res, "Book does not exist");
    }
    const user = await UserModel.findOne({ _id: user_id }).populate(
      "borrowed_books"
    );
    if (user.borrowed_books.length >= 5) {
      return badRequrest(res, "Borrow limit reached");
    }

    const borrows = user.borrowed_books;
    for (let i = 0; i > borrows.length; i++) {
      if (borrows[i].book_id.toString() === book_id) {
        return badRequrest(res, "Already Borrowed");
      }
    }
    const isAvailable = book.is_available;
    if (!isAvailable) {
      return badRequrest(res, "Book is not available");
    }
    const data = {
      book_id,
      user_id,
      ended_date,
      is_ended,
      date,
      dead_line,
    };
    const newBorrow = new BorrowedBookModel(data);
    await newBorrow.save();
    await BookModel.findByIdAndUpdate(book_id, {
      is_available: false,
    });
    console.log("count =>", 5 - (user.borrowed_books.length + 1));
    await UserModel.findByIdAndUpdate(user_id, {
      $push: { borrowed_books: newBorrow },
      $set: { borrow_count: 5 - (user.borrowed_books.length + 1) },
    });

    return created(res, newBorrow, "Borrow successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const getBorrow = async (req, res) => {
  try {
    const borrows = await BorrowedBookModel.find({})
      .sort({ createdAt: -1 })
      .populate("user_id")
      .populate("book_id");
    return successful(res, borrows, "Borrowed books retrived successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const updaeBorrow = async (req, res) => {
  const { id } = req.params;
  const { book_id, user_id, date, ended_date, is_ended, dead_line } = req.body;
  try {
    const borrow = await BorrowedBookModel.findOne({ _id: id });
    if (!borrow) {
      return badRequrest(res, "Borrowed book does not exist");
    }
    const data = {
      book_id,
      user_id,
      ended_date,
      is_ended,
      date,
      dead_line,
    };
    const borrowupdate = await BorrowedBookModel.findByIdAndUpdate(id, data);
    return created(res, borrowupdate, "Successfully updated");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const borrowDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const borrow = await BorrowedBookModel.findById({ _id: id });
    if (!borrow) {
      return badRequrest(res, "Borrow no longer exists");
    }
    return successful(res, borrow, "Borrow book retrived successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const endBorrow = async (req, res) => {
  const { id } = req.params;
  const { ended_date } = req.body;
  try {
    const borrow = await BorrowedBookModel.findOne({ _id: id });
    console.log(borrow);
    if (!borrow) {
      return badRequrest(res, "Borrowed book does not exist");
    }

    if (borrow.is_ended) {
      return badRequrest(res, "Borrow already ended");
    }
    await BorrowedBookModel.findByIdAndUpdate(id, {
      is_ended: true,
      ended_date: ended_date,
    });
    await BookModel.findByIdAndUpdate(borrow.book_id, {
      is_available: true,
    });
    const user = await UserModel.findById({ _id: borrow.user_id });
    console.log("borrow id", borrow._id);
    await UserModel.findByIdAndUpdate(borrow.user_id, {
      $pull: { borrowed_books: id },
      $set: { borrow_count: user.borrow_count + 1 },
    });
    return successful(res, borrow, "End Borrow successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const BorrowController = {
  createBorrow,
  getBorrow,
  updaeBorrow,
  borrowDetail,
  endBorrow,
};
module.exports = BorrowController;

const BookModel = require("../models/BookModel");
const {
  internalServerError,
  badRequrest,
  created,
  successful,
} = require("../utils/responsehandler/responsehandler");

const createBook = async (req, res) => {
  const {
    book_name,
    image,
    author,
    published_date,
    is_available,
    book_categories,
    available_borroww_time,
  } = req.body;
  try {
    const book = await BookModel.findOne({ book_name: book_name });
    if (book) {
      return badRequrest(res, "Book already exists");
    }

    const data = {
      book_name,
      image,
      author,
      published_date,
      is_available,
      book_categories,
      available_borroww_time,
    };
    const newBook = new BookModel(data);
    await newBook.save();
    return created(res, newBook, "Book created successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find({})
      .sort({ created_at: -1 })
      .populate("book_categories");
    return successful(res, books, "Book retrived successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const bookDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById({ _id: id }).populate(
      "book_categories"
    );
    if (!book) {
      return badRequrest(res, "Book does not exist");
    }
    return successful(res, book, "Book retrive successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const {
    book_name,
    image,
    author,
    published_date,
    is_available,
    book_categories,
    available_borroww_time,
  } = req.body;

  try {
    const book = await BookModel.findOne({ _id: id });
    if (!book) {
      return badRequrest(res, "Book does not exist");
    }
    const data = {
      book_name,
      image,
      author,
      published_date,
      is_available,
      book_categories,
      available_borroww_time,
    };
    const updateBook = await BookModel.findByIdAndUpdate(id, data);
    return created(res, data, "Updated successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findOne({ _id: id });
    if (!book) {
      return badRequrest(res, "Book does not exist");
    }

    await BookModel.findByIdAndDelete(id);
    return successful(res, book, "Deleted successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const BookController = {
  createBook,
  getAllBooks,
  updateBook,
  bookDetail,
  deleteBook,
};
module.exports = BookController;

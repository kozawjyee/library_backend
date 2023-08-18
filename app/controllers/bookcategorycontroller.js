const BookModel = require("../models/BookModel");
const BookCategoryModel = require("../models/BookCategory");
const {
  internalServerError,
  badRequrest,
  created,
  successful,
} = require("../utils/responsehandler/responsehandler");

const createCategory = async (req, res) => {
  const { name, is_active } = req.body;

  try {
    const category = await BookCategoryModel.findOne({ name: name });
    if (category) {
      return badRequrest(res, "Category already exists");
    }
    const newBook = new BookCategoryModel({ name, is_active });
    await newBook.save();
    return created(res, newBook, "Category created successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await BookCategoryModel.find({});
    return successful(res, categories, "categories retrived successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await BookCategoryModel.findOne({ _id: id });
    if (!category) {
      return badRequrest(res, "category not exists");
    }
    await BookCategoryModel.findByIdAndDelete(id);
    return successful(res, category, "Category deleted successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const CategoryController = { createCategory, getCategories, deleteCategory };
module.exports = CategoryController;

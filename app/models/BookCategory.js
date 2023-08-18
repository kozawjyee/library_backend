const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookCategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const BookCategoryModel = mongoose.model("book_category", bookCategorySchema);
module.exports = BookCategoryModel;

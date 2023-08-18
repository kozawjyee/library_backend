const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    book_name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    published_date: {
      type: Date,
      required: true,
    },
    is_available: {
      type: Boolean,
      required: true,
      default: true,
    },
    book_categories: [{ type: Schema.Types.ObjectId, ref: "book_category" }],
    avialable_borrow_day: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("book", bookSchema);
module.exports = BookModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boorowedBookSchema = new Schema(
  {
    book_id: { type: Schema.Types.ObjectId, ref: "book" },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    dead_line: {
      type: Date,
      required: true,
    },
    is_ended: {
      type: Boolean,
      required: true,
      default: false,
    },
    ended_date: {
      type: Date,
      default: "",
    },
  },
  { timestamps: true }
);

const BorrowedBookModel = mongoose.model("borrowed_book", boorowedBookSchema);
module.exports = BorrowedBookModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    user_role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    nrc: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    borrow_count: {
      type: Number,
      required: true,
      default: 5,
      min: 0,
      max: 5,
    },
    borrowed_books: [{ type: Schema.Types.ObjectId, ref: "borrowed_book" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

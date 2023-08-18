require("dotenv").config();
const mongoose = require("mongoose");

const database_url = process.env.DATABASE_URL;

mongoose.connect(database_url, { useNewUrlParser: true });

exports.db = mongoose.connection;

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./db");
const app = express();
const port = process.env.PORT;
const router = require("./routes/route");
const cors = require("cors");

const allowList = ["http://localhost:5173"];

app.use(bodyParser.json());
app.use(cors());

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});

app.use("/backend", router);
app.use("/static", express.static("static"));

app.listen(port, () => {
  console.log(`server is listening on port=${port}`);
});

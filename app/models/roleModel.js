const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const RoleModel = mongoose.model("role", roleSchema);
module.exports = RoleModel;

const RoleModel = require("../models/roleModel");
const {
  badRequrest,
  created,
  internalServerError,
  successful,
} = require("../utils/responsehandler/responsehandler");

const createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const role = await RoleModel.findOne({ name: name });
    if (role) {
      return badRequrest(res, "Role already exists");
    }
    const newRole = new RoleModel({ name: name });
    await newRole.save();

    return created(res, newRole, "Role created successfully");
  } catch (err) {
    console.log("create role", err);
    return internalServerError(res);
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find({});
    return successful(res, roles, "Retrive all roles successfully");
  } catch (err) {
    console.log("create role", err);
    return internalServerError(res);
  }
};

const deleteRole = async (req, res) => {
  try {
    const { name } = req.name;
    const role = await RoleModel.findOne({ name: name });
    if (!role) {
      return badRequrest(res, "role already deleted");
    }

    await RoleModel.deleteOne(role);
    return successful(res, role, "Role deleted successfully");
  } catch (err) {
    console.log("create role", err);
    return internalServerError(res);
  }
};

const RoleController = { createRole, getRoles, deleteRole };
module.exports = RoleController;

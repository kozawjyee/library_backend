const Bcrypt = require("bcrypt");
const jwtDecode = require("jwt-decode");
const UserModel = require("../models/UserModel");
const {
  badRequrest,
  internalServerError,
  created,
  unauthorized,
  successful,
} = require("../utils/responsehandler/responsehandler");
const { signUpBodyValidation } = require("../utils/validations/validations");
const generateToken = require("../utils/token/generatetoken");
const UserTokenModel = require("../models/UserTokenModel");
const RoleModel = require("../models/roleModel");

const singnUpUser = async (req, res) => {
  const { name, username, user_role, email, phone_no, address, nrc, password } =
    req.body;

  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      return badRequrest(res, error.details[0].message);
    }

    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user) {
      return badRequrest(res, "User already exist");
    }

    const userRole = await RoleModel.findOne({ name: user_role });
    if (!userRole) {
      return badRequrest(res, "Role not found");
    }
    const salt = await Bcrypt.genSalt(Number(process.env.SALT));
    const hashpassword = await Bcrypt.hash(password, salt);
    const newUser = {
      name,
      username,
      user_role,
      email,
      phone_no,
      address,
      nrc,
      password: hashpassword,
    };
    console.log("newuser", newUser);
    await new UserModel(newUser).save();
    return created(res, newUser, "User successfully created");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return unauthorized(res, "User does not exist");
    }

    const verifiedpassword = await Bcrypt.compare(password, user.password);
    if (!verifiedpassword) {
      return unauthorized(res, "Invalid password");
    }
    const { accessToken, refreshToken } = await generateToken(user.toJSON());
    const data = { user, accessToken, refreshToken };
    return successful(res, data, "Login successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).populate("borrowed_books");
    return successful(res, users, "Users retrived successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, user_role, email, phone_no, address, nrc, password } =
    req.body;
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return badRequrest(res, "User does not exit");
    }
    const salt = await Bcrypt.genSalt(Number(process.env.SALT));
    const hashpassword = await Bcrypt.hash(password, salt);
    const updateUser = {
      name,
      username,
      user_role,
      email,
      phone_no,
      address,
      nrc,
      password: hashpassword,
    };

    const updateded = await UserModel.findByIdAndUpdate(id, updateUser);
    return created(res, updateded, "User updated successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const userDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById({ _id: id }).populate({
      path: "borrowed_books",
      populate: { path: "book_id" },
    });
    if (!user) {
      return badRequrest(res, "user does not exist");
    }
    return successful(res, user, "User Retrive successfully");
  } catch (err) {
    console.log(err);
    return internalServerError(res);
  }
};

const logout = async (req, res) => {
  const { secret_key } = req.headers;
  try {
    const user = jwtDecode(secret_key);
    const userToken = await UserTokenModel.findOne({ userId: user._id });
    if (userToken) {
      await UserModel.deleteOne(userToken);
      return successful(res, userToken, "Logout Successful");
    }
    return badRequrest(res, "Invalid Token");
  } catch (err) {
    return Promise.reject(err);
  }
};

const UserConroller = {
  singnUpUser,
  loginUser,
  logout,
  getUsers,
  userDetail,
  updateUser,
};
module.exports = UserConroller;

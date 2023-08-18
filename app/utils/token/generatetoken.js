const jwt = require("jsonwebtoken");
const UserTokenModel = require("../../models/UserTokenModel");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const generateToken = async (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    phone_no: user.phone_no,
    address: user.address,
    nrc: user.nrc,
    user_role: user.user_role,
  };
  try {
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "90m",
    });

    const userToken = await UserTokenModel.findOne({ userId: user._id });
    if (userToken) {
      await UserTokenModel.deleteOne(userToken);
    }

    await new UserTokenModel({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    console.log("generatetoken error", err);
    return Promise.reject(error);
  }
};

module.exports = generateToken;

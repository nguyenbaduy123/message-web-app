const UserModel = require("../models/UserModel");

exports.getAllUser = async () => {
  return await UserModel.findAll();
};

exports.updateToken = async (id, refreshToken) => {
  return await UserModel.updateToken(id, refreshToken);
};

exports.saveUser = async (user) => {
  return await user.save();
};

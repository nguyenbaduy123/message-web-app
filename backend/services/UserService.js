const UserModel = require("../models/UserModel");

exports.getAllUser = async () => {
  return await UserModel.findAll();
};

exports.updateToken = async (id, user) => {
  return await UserModel.updateToken(id, user);
};

exports.saveUser = async (user) => {
  return await user.save();
};

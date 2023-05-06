const UserModel = require("../models/UserModel");
const query = require("../db/database");

exports.getAllUser = async () => {
  return await query("SELECT * FROM student", []);
};

exports.updateToken = async (id, user) => {
  return await UserModel.updateToken(id, user);
};

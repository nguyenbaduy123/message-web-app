const GroupMessageModel = require("../models/GroupMessageModel");

exports.getAllMsg = async () => {
  return await GroupMessageModel.findAll();
};

exports.saveMsg = async (msg) => {
  return await msg.save();
};

const PrivateMessageModel = require("../models/PrivateMessageModel");

exports.getAllMsgs = async () => {
  return await PrivateMessageModel.findAll();
};

exports.saveMsg = async (msg) => {
  return await msg.save();
};

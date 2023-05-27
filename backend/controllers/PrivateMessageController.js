const PrivateMessageModel = require("../models/PrivateMessageModel");
const PrivateMessageService = require("../services/PrivateMessageService");

exports.getAllMsg = async (req, res) => {
  try {
    const messages = await PrivateMessageService.getAllMsgs();
    console.log(messages);

    res.json({ messages });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

exports.saveMsg = async (req, res) => {
  try {
    const data = req.body;
    const msg = new PrivateMessageModel(data);

    const result = await PrivateMessageService.saveMsg(msg);

    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

exports.getPrivateMessage = async (req, res) => {
  const id = req.query.id;
  const result = await PrivateMessageModel.getPrivateMessage(id);

  if (result) return res.json(result);
};

exports.getAllPrivateMessage = async (req, res) => {
  const id = req.query.id;
  const result = await PrivateMessageModel.getAllPrivateMessage(id);

  if (result) return res.json(result);
};

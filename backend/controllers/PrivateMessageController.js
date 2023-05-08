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

    const result = await PrivateMessageModel.saveMsg(msg);

    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

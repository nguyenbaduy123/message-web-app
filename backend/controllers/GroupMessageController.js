const GroupMessageModel = require("../models/GroupMessageModel");
const GroupMessageService = require("../services/GroupMessageService");

exports.getAllMsg = async (req, res) => {
  try {
    const messages = await GroupMessageModel.getAllMsgs();
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
    const msg = new GroupMessageModel(data);

    const result = await GroupMessageService.saveMsg(msg);

    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

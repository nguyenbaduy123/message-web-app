const FriendService = require("../services/FriendService");
const FriendModel = require("../models/FriendModel");

exports.getFriendList = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const model = new FriendModel(id);
  model.user_id_1 = id;

  const result = await FriendService.getFriendList(model);
  return res.status(200).json(result);
};

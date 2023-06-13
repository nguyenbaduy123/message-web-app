const GroupService = require("../services/GroupService");
const GroupModel = require("../models/GroupModel");
const UserGroupModel = require("../models/UserGroupModel");

exports.saveGroup = async (req, res) => {
  try {
    const data = req.body;
    const group = new GroupModel(data);

    const result = await GroupService.saveGroup(group);

    return res.send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.saveUserGroup = async (req, res) => {
  try {
    const data = req.body;
    const userGroup = new UserGroupModel(data);

    const result = await GroupService.saveUserGroup(userGroup);

    returnres.send(result);
  } catch (err) {
    console.log(err);
  }
};

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

    for (item of data) {
      console.log(item);
      const userGroup = new UserGroupModel(item);

      const result = await GroupService.saveUserGroup(userGroup);
    }

    return res.send("Success");
  } catch (err) {
    console.log(err);
  }
};

exports.getAllGroupMessage = async (req, res) => {
  const id = req.query.id;
  const result = await GroupModel.getAllGroupMessage(id);

  if (result) return res.json(result);
};

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

exports.getAllMember = async (req, res) => {
  try {
    const id = req.query.id;
    const group = new GroupModel(id);
    group.id = id;

    const result = await GroupService.getAllMember(group);
    if (result) return res.json(result);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteUserGroup = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const group = new UserGroupModel(body);

    const result = await GroupService.deleteUserGroup(group);
    if (result) return res.json(result);
  } catch (error) {
    console.error(error);
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const body = req.body;
    const group = new GroupModel(body);

    const result = await GroupService.updateGroup(group);

    // return res.json("Ok");
    if (result) return res.json(result);
  } catch (error) {
    console.error(error);
  }
};

const UserModel = require("../models/UserModel");
const userService = require("../services/UserService");

exports.getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    console.log(users);

    res.json({ users });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

exports.saveUser = async (req, res) => {
  try {
    const data = req.body;
    const user = new UserModel(data);

    const result = await userService.saveUser(user);

    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

// exports.updateToken = async (req, res) => {
//     try {
//         const user
//     }
// }

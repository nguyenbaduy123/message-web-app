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

// exports.updateToken = async (req, res) => {
//     try {
//         const user
//     }
// }

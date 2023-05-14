const UserModel = require("../models/UserModel");
const userService = require("../services/UserService");
const jwt = require("jsonwebtoken")

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

exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const result = await UserModel.login(email, password)
  if(result) {
    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign({ email: email }, 'secret', { expiresIn: '24hr' });
    res.cookie('jwt', token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.status(200).json({ result });
  } else {
    res.sendStatus(404).json({data: "no account"})
  }
}

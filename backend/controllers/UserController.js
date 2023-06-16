const UserModel = require("../models/UserModel");
const userService = require("../services/UserService");
const jwt = require("jsonwebtoken");
const generateToken = require("../auth/JwtAuth");

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
  const email = req.body.email;
  const password = req.body.password;
  const result = await UserModel.login(email, password);
  if (result.success) {
    const { accessToken, refreshToken } = generateToken(result.user);

    userService.updateToken(result.user.id, refreshToken);
    res.json({ user: result.user, accessToken, refreshToken });
  } else {
    res.json({ error: result.error });
  }
};

exports.searchUsers = async (req, res) => {
  const { keyword, userId } = req.body;
  const result = await UserModel.searchUsers(userId, keyword);
  res.status(result.statusCode).json(result);
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const result = await UserModel.updateUser(userId, userData);
  return res.status(result.statusCode).json(result);
};

exports.updateToken = async (req, res) => {
  const users = await UserModel.findAll();
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  const user = users.find((user) => user.refreshToken === refreshToken);
  console.log(user);

  if (!user) return res.sendStatus(403);

  try {
    const check = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(check);

    const tokens = generateToken(user);
    userService.updateToken(user.id, tokens.refreshToken);

    return res.json({ tokens });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

exports.getUser = async (req, res) => {
  console.log(req);
  const id = req.params.id;
  const result = await UserModel.getUser(id);
  return res.status(result.statusCode).json(result);
};

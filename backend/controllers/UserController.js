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

    // const maxAge = 3 * 24 * 60 * 60;
    // const token = jwt.sign({ email: email }, "secret", { expiresIn: "72hr" });
    // res.cookie("jwt", token, {
    //   maxAge: maxAge,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    // });
    res.json({ user: result.user, accessToken, refreshToken });
  } else {
    res.json({ error: result.error });
  }
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

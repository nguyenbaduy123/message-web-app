const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const generateToken = require("../auth/JwtAuth");
const {
  getAllUser,
  saveUser,
  login,
  getPrivateMessage,
  getAllPrivateMessage,
} = require("../controllers/UserController");

const { saveMsg } = require("../controllers/PrivateMessageController");

const router = express.Router();

let users = [
  {
    id: 1,
    username: "Henry",
    refreshToken: null,
  },

  {
    id: 2,
    username: "Darwin",
    refreshToken: null,
  },
];

const posts = [
  {
    userId: 1,
    post: "Post Henry",
  },

  {
    userId: 2,
    post: "Post Darwin",
  },
];

const updateRefreshToken = (username, refreshToken) => {
  users = users.map((user) => {
    if (user.username === username)
      return {
        ...user,
        refreshToken: refreshToken,
      };

    return user;
  });
};

router.route("/").get(getAllUser).post(saveUser);
router.route("/login").post(login);

//   (req, res) => {
//   const username = req.body.username;
//   const user = users.find((user) => user.username === username);

//   if (!user) return res.sendStatus(401);

//   const tokens = generateToken(user);
//   updateRefreshToken(username, tokens.refreshToken);

//   res.json({ tokens });
// }
// );

router.route("/msg/private").get(getAllPrivateMessage).post(saveMsg);

router.route("/posts").get(verifyToken, (req, res) => {
  res.json(posts.filter((posts) => posts.userId === req.userId));
});

router.route("/auth/token").post((req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  const user = users.find((user) => user.refreshToken === refreshToken);

  console.log(!user);

  if (!user) return res.sendStatus(403);

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const tokens = generateToken(user);
    updateRefreshToken(user.username, tokens.refreshToken);

    res.json({ tokens });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
});

router.route("/logout").delete(verifyToken, (req, res) => {
  const user = users.find((user) => user.id === req.userId);

  if (!user) return res.sendStatus(401);

  updateRefreshToken(user.username, null);
  res.json({ users });
});

module.exports = router;

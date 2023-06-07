const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const generateToken = require("../auth/JwtAuth");
const {
  getAllUser,
  saveUser,
  login,
  updateToken,
} = require("../controllers/UserController");

const router = express.Router();

// const updateToken = (username, refreshToken) => {
//   users = users.map((user) => {
//     if (user.username === username)
//       return {
//         ...user,
//         refreshToken: refreshToken,
//       };

//     return user;
//   });
// };

router.route("/").get(getAllUser).post(saveUser);
router.route("/login").post(login);

router.route("/posts").get(verifyToken, (req, res) => {
  res.json(posts.filter((posts) => posts.userId === req.userId));
});

router.route("/auth/refresh").post(updateToken);

router.route("/logout").delete(verifyToken, (req, res) => {
  const user = users.find((user) => user.id === req.userId);

  if (!user) return res.sendStatus(401);

  updateRefreshToken(user.username, null);
  res.json({ users });
});

module.exports = router;

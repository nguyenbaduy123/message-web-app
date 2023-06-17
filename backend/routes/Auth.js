const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const generateToken = require("../auth/JwtAuth");
const {
  getAllUser,
  saveUser,
  login,
  updateToken,
  searchUsers,
  getUser,
  updateUser,
} = require("../controllers/UserController");
const multer = require("../middleware/multer");
const UserModel = require("../models/UserModel");
const { getFriendList } = require("../controllers/FriendController");

const router = express.Router();

router.route("/").get(getAllUser).post(saveUser);
router.route("/friend").get(verifyToken, getFriendList);
router.route("/login").post(login);
router.route("/search").post(searchUsers);
router.route("/:id").get(verifyToken, getUser).put(verifyToken, updateUser);

router.route("/posts").get(verifyToken, (req, res) => {
  res.json(posts.filter((posts) => posts.userId === req.userId));
});

router.route("/upload-avatar").post((req, res, next) => {
  multer.upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    UserModel.saveAvatarImage(req.body.id, req.file.originalname);

    return res.status(200).send(req.file);
  });
});

router.route("/upload-bg").post((req, res, next) => {
  multer.upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    UserModel.saveBgImage(req.body.id, req.file.originalname);

    return res.status(200).send(req.file);
  });
});

router.route("/auth/refresh").post(updateToken);

router.route("/logout").delete(verifyToken, (req, res) => {
  const user = users.find((user) => user.id === req.userId);

  if (!user) return res.sendStatus(401);

  updateRefreshToken(user.username, null);
  res.json({ users });
});

module.exports = router;

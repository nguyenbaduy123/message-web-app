const express = require("express");
const {
  getPrivateMessage,
  getAllPrivateMessage,
} = require("../controllers/PrivateMessageController");
const multer = require("../middleware/multer");

const {
  saveGroup,
  saveUserGroup,
  getAllGroupMessage,
  getAllMember,
  deleteUserGroup,
} = require("../controllers/GroupController");

const { saveMsg } = require("../controllers/PrivateMessageController");
const { saveGroupMsg } = require("../controllers/GroupMessageController");
const GroupModel = require("../models/GroupModel");
const router = express.Router();

router.route("/private").get(getAllPrivateMessage).post(saveMsg);

router.route("/group").get(getAllGroupMessage).post(saveGroupMsg);
router.route("/new-group").post(saveGroup);
router.route("/user-group").post(saveUserGroup).delete(deleteUserGroup);
router.route("/member").get(getAllMember);

router.route("/upload-avatar").post((req, res, next) => {
  multer.upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    GroupModel.saveImage(req.body.id, req.file.originalname);
    return res.status(200).send(req.file);
  });
});

module.exports = router;

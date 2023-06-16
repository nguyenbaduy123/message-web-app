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
} = require("../controllers/GroupController");

const { saveMsg } = require("../controllers/PrivateMessageController");
const GroupModel = require("../models/GroupModel");
const router = express.Router();

router.route("/private").get(getAllPrivateMessage).post(saveMsg);

router.route("/group").get(getAllGroupMessage);
router.route("/new-group").post(saveGroup);
router.route("/user-group").post(saveUserGroup);

router.route("/upload-avatar").post((req, res, next) => {
  multer.upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    console.log(req.body.id, req.file);
    GroupModel.saveImage(req.body.id, req.file.originalname);
    return res.status(200).send(req.file);
  });
});

module.exports = router;

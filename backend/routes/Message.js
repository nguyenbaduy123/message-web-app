const express = require("express");
const {
  getPrivateMessage,
  getAllPrivateMessage,
} = require("../controllers/PrivateMessageController");

const { saveGroup, saveUserGroup } = require("../controllers/GroupController");
const { saveMsg } = require("../controllers/PrivateMessageController");
const router = express.Router();

router.route("/private").get(getAllPrivateMessage).post(saveMsg);

router.route("/new-group").post(saveGroup);
router.route("/user-group").post(saveUserGroup);

module.exports = router;

const express = require("express");
const {  getPrivateMessage, getAllPrivateMessage} = require('../controllers/PrivateMessageController')
const { saveMsg } = require("../controllers/PrivateMessageController");
const router = express.Router();

router.route("/private").get(getAllPrivateMessage).post(saveMsg);

module.exports = router;


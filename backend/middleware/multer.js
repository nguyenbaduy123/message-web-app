const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "uploads/");
  },

  filename: function (req, file, next) {
    next(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

exports.upload = upload.single("file");

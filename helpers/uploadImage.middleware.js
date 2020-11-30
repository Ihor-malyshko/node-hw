const path = require("path");
const multer = require("multer");

const DRAFT_FILES_PATH = path.join(__dirname, "../private/draft");

const storage = multer.diskStorage({
  destination: DRAFT_FILES_PATH,
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

exports.uploadImage = upload.single("avatar");

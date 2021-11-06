const multer = require("multer");
require('dotenv').config();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, "-" + Date.now() + file.originalname.replace(/\s+/g, ""));
    },
});

var upload = multer({ storage: storage });


module.exports = multer({ storage, upload });
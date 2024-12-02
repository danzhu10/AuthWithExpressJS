const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s/g, ""));
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 , // 1MB limit
  },
  
});

const handleFileSizeLimit = (req, res, next) => {
  // Check if the file size exceeds the limit
  if (req.file && req.file.size > 500 * 1024) {
      return res.status(400).json({ error: 'File size exceeds the limit of 500KB' });
  }
  next();
};

module.exports = { upload, handleFileSizeLimit };

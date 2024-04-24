const multer = require("multer");
const path = require("path");

//get image file

const storage = multer.diskStorage({
  destination: (req, file, call) => {
    call(null, "uploads");
  },
  filename: function (req, file, call) {
    call(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
    filefilter: (req, file, call) => {
      const fileTypes = /jpeg|jpg|JPEG|PNG|png/;
      const minType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (minType && extname) {
        return call(null, true);
      } else {
        return call("File format invalid");
      }
    },
  },
}).single("image");

module.exports = upload;

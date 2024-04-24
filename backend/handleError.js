const multer = require("multer");

function handleError(err, re, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = handleError;

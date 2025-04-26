const fs = require("fs");
const removeExif = require("piexifjs").remove;

function sanitizeJpeg(filePath) {
  const binary = fs.readFileSync(filePath, "binary");
  const stripped = removeExif(binary);
  fs.writeFileSync(filePath, stripped, "binary");
  console.log("EXIF data removed from JPEG.");
}

module.exports = sanitizeJpeg;

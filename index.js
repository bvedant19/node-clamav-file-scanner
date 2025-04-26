const path = require("path");
const fs = require("fs");

const { initClamavScanner, scanFileWithClamAV } = require("./clamav/scanner");
const sanitizeSvg = require("./sanitizers/svgSanitizer");
const sanitizePdf = require("./sanitizers/pdfSanitizer");
const sanitizeJpeg = require("./sanitizers/jpegSanitizer");

async function scanFile(file, sanitizeFlag = false) {
  initClamavScanner();

  
  try {
    const fileName = file?.name || file?.originalname || file?.path || "";
    const ext = path.extname(fileName).toLowerCase();
    const isSvg = file.mimetype === "image/svg+xml" || fs.readFileSync(file.path, "utf8").startsWith("<svg");
    if(sanitizeFlag) {
      if (isSvg) {
        sanitizeSvg(file.path);
      }
      else if (ext === ".pdf") {
        await sanitizePdf(file.path);
      } 
      else if ([".jpg", ".jpeg"].includes(ext) || file.mimetype === "image/jpeg") {
        sanitizeJpeg(file.path);
      }
    }

    await scanFileWithClamAV(file.path);
    return true;
  } catch (error) {
    console.error("Scan failed:", error.message);
    throw error;
  }
}

module.exports = {
  scanFile,
  initClamavScanner,
};

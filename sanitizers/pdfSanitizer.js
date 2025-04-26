const fs = require("fs");
const { execSync } = require("child_process");
const isQpdfInstalled = require("../utils/qpdfCheck");

async function sanitizePdf(filePath) {
  const isInstalled = await isQpdfInstalled();
  if (!isInstalled) {
    console.warn("qpdf not installed. Skipping PDF sanitization.");
    return;
  }

  const tempOut = filePath + "_clean.pdf";
  execSync(`qpdf --linearize "${filePath}" "${tempOut}"`);
  fs.renameSync(tempOut, filePath);
  console.log("PDF sanitized using qpdf.");
}

module.exports = sanitizePdf;

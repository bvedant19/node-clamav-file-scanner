const { exec } = require("child_process");

function isQpdfInstalled() {
  return new Promise((resolve) => {
    exec("command -v qpdf", (err) => resolve(!err));
  });
}

module.exports = isQpdfInstalled;

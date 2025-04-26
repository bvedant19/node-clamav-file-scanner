const fs = require("fs");
const clamd = require("clamdjs");

let scanner;
let config;

function initClamavScanner(userConfig) {
  config = require("./config").getConfig(userConfig);
  scanner = clamd.createScanner(config.host, config.port);
  console.log("ClamAV Scanner initialized with config:", config);
}

async function scanFileWithClamAV(filePath) {
  const fileStream = fs.createReadStream(filePath, {
    highWaterMark: 30 * 1024 * 1024,
  });
  const reply = await scanner.scanStream(fileStream, config.timeout);
  console.log("ClamAV scan reply:", reply);

  if (!clamd.isCleanReply(reply)) {
    const virus = reply.replace("stream:", "").replace(" FOUND", "").trim();
    throw new Error(`This file is infected with a virus: ${virus}`);
  }

  return true;
}

module.exports = {
  initClamavScanner,
  scanFileWithClamAV,
};

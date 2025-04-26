const defaultClamavConfig = {
    host: "127.0.0.1",
    port: 3310,
    timeout: 60000,
    maxFileSize: 50 * 1024 * 1024,
  };
  
  function getConfig(userConfig = {}) {
    return {
      host: userConfig.host || defaultClamavConfig.host,
      port: parseInt(userConfig.port || defaultClamavConfig.port, 10),
      timeout: parseInt(userConfig.timeout || defaultClamavConfig.timeout, 10),
      maxFileSize: parseInt(userConfig.maxFileSize || defaultClamavConfig.maxFileSize, 10),
    };
  }
  
  module.exports = { getConfig };
  
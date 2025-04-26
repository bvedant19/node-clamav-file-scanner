# 🛡️ Node ClamAV File Scanner

A simple and efficient Node.js utility for sanitizing and scanning uploaded files using ClamAV.

## Features
- **Sanitization**: Clean files (SVG, PDF, JPEG) before scanning.
- **Virus Scanning**: Leverages ClamAV for virus detection.
- **Easy Integration**: Simple API for quick setup.

## Installation
```bash
npm install node-clamav-file-scanner
```



## Usage

1. Initialize ClamAV Scanner

```js
const { initClamavScanner, scanFile } = require('node-clamav-file-scanner');

initClamavScanner({
  host: '127.0.0.1',  // ClamAV server host
  port: 3310,         // ClamAV server port
  timeout: 50000,     // Timeout in ms
});

```

2. Scan Files
```js
try {
  await scanFile(file, true); // 'true' to enable sanitization
  console.log('File is clean!');
} catch (error) {
  console.error('Error scanning file:', error.message);
}
```

``scanFile`` Parameters
file: The file object with properties path, originalname, and mimetype.

sanitizeFlag: (Optional) If true, sanitizes before scanning.

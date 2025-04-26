const fs = require("fs");
const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");

function sanitizeSvg(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);

  DOMPurify.setConfig({
    USE_PROFILES: { svg: true },
    ADD_ATTR: ["x", "y", "width", "height", "cx", "cy", "r", "rx", "ry", "fill", "stroke", "stroke-width", "font-size", "d", "transform", "viewBox", "preserveAspectRatio", "text-anchor"],
    FORBID_TAGS: ["script", "foreignObject"],
    FORBID_ATTR: [/^on.*/i],
  });

  const sanitizedSvg = DOMPurify.sanitize(fileContent);
  fs.writeFileSync(filePath, sanitizedSvg, "utf8");
  console.log("SVG sanitized successfully.");
}

module.exports = sanitizeSvg;

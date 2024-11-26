const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');

const readContent = (page) => {
  const filePath = path.join(contentDir, `${page}.json`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  }
  return null;
};

const writeContent = (page, content) => {
  const filePath = path.join(contentDir, `${page}.json`);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
};

module.exports = {
  readContent,
  writeContent,
};

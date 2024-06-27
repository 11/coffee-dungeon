const fs = require('fs');
const path = require('path');

function addJSExtension(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      addJSExtension(filePath);
    } else if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
        if (p1.startsWith('.') && !p1.endsWith('.js')) {
          return match.replace(p1, p1 + '.js');
        }
        return match;
      });
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

// Replace './dist' with the path to your output directory
addJSExtension('./dist');

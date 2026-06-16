const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '../node_modules/elliptic/package.json');

if (!fs.existsSync(packagePath)) {
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

if (pkg.version === '6.6.1') {
  pkg.version = '6.6.2';
  fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
}

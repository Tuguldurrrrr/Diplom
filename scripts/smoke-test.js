const { execSync } = require('child_process');
const fs = require('fs');

const requiredFiles = [
  'app.js',
  'config/db.js',
  'routes/pageRoutes.js',
  'routes/authRoutes.js',
  'routes/serviceRoutes.js',
  'routes/orderRoutes.js',
  'views/home/index.html',
  'views/services/list.html',
  'views/orders/create.html',
  'public/css/style.css',
  'sql/schema.sql'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

execSync("for f in $(rg --files -g '*.js'); do node --check \"$f\" || exit 1; done", { stdio: 'inherit' });
console.log('Smoke test passed: required files exist and JS syntax is valid.');

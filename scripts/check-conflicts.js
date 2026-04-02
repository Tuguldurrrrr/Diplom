const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IGNORE = new Set(['.git', 'node_modules', 'uploads']);
const PATTERN = /^(<<<<<<<|=======|>>>>>>>)/m;

function scan(dir, hits = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORE.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scan(full, hits);
    } else {
      const content = fs.readFileSync(full, 'utf8');
      if (PATTERN.test(content)) hits.push(path.relative(ROOT, full));
    }
  }
  return hits;
}

const hits = scan(ROOT);
if (hits.length) {
  console.error('Merge conflict marker detected in files:');
  hits.forEach((h) => console.error(' -', h));
  process.exit(1);
}

console.log('No merge conflict markers found.');

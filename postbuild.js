const fs = require('fs');
const path = require('path');

// Copier sitemap.xml et robots.txt dans build
const publicDir = path.join(__dirname, 'public');
const buildDir = path.join(__dirname, 'build');

fs.copyFileSync(
  path.join(publicDir, 'sitemap.xml'),
  path.join(buildDir, 'sitemap.xml')
);

fs.copyFileSync(
  path.join(publicDir, 'robots.txt'),
  path.join(buildDir, 'robots.txt')
);

console.log('✅ sitemap.xml et robots.txt copiés dans build/');

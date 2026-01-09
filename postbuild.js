const fs = require('fs');
const path = require('path');

// Copier sitemap.xml, robots.txt et maintenance.html dans build
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

fs.copyFileSync(
  path.join(publicDir, 'maintenance.html'),
  path.join(buildDir, 'maintenance.html')
);

console.log('✅ sitemap.xml, robots.txt et maintenance.html copiés dans build/');

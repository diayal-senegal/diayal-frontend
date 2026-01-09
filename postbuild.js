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

// REMPLACER index.html par maintenance.html pour activer la maintenance
fs.copyFileSync(
  path.join(publicDir, 'maintenance.html'),
  path.join(buildDir, 'index.html')
);

console.log('✅ Mode maintenance activé : index.html remplacé par maintenance.html');

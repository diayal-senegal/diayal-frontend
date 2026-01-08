export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");

  res.status(200).send(`User-agent: *
Allow: /

# Disallow private areas
Disallow: /dashboard/
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /login
Allow: /register
Allow: /shops
Allow: /products

# Sitemap
Sitemap: https://www.diayal.sn/sitemap.xml
`);
}
# 🚧 Mode Maintenance - Diayal

## Comment activer la maintenance ?

1. **Renommer les fichiers :**
   ```bash
   mv vercel.json vercel.production.json
   mv vercel.maintenance.json vercel.json
   ```

2. **Commit et push :**
   ```bash
   git add .
   git commit -m "🚧 Activation du mode maintenance"
   git push
   ```

3. **Vercel redéploiera automatiquement** avec la page de maintenance

---

## Comment désactiver la maintenance ?

1. **Renommer les fichiers :**
   ```bash
   mv vercel.json vercel.maintenance.json
   mv vercel.production.json vercel.json
   ```

2. **Commit et push :**
   ```bash
   git add .
   git commit -m "✅ Désactivation du mode maintenance"
   git push
   ```

3. **Le site normal sera de nouveau accessible**

---

## Fichiers

- `vercel.json` → Configuration active (actuellement en production)
- `vercel.maintenance.json` → Configuration de maintenance (à activer si besoin)
- `vercel.production.json` → Sauvegarde de la config production (créé après activation maintenance)
- `public/maintenance.html` → Page de maintenance

---

## Notes

- La page de maintenance renvoie un code HTTP 503 (Service Unavailable)
- Google comprendra que c'est temporaire grâce au header "Retry-After"
- Le sitemap.xml et robots.txt restent accessibles pour le SEO

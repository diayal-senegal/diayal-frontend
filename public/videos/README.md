# Vidéos Diayal - Multi-formats

## 📱 FICHIERS REQUIS POUR TOUS LES ÉCRANS :

### 1. VERSION DESKTOP/TABLET

#### diayal-teaser-desktop.mp4
- **Durée** : 1 minute 30 secondes
- **Format** : MP4 (H.264)
- **Résolution** : 1920x1080 (16:9)
- **Audio** : Oui (musique + voix-off)
- **Poids** : < 50MB
- **Usage** : Écrans ≥ 768px

#### diayal-teaser-desktop.webm
- **Durée** : 1 minute 30 secondes
- **Format** : WebM (VP9)
- **Résolution** : 1920x1080 (16:9)
- **Audio** : Oui (musique + voix-off)
- **Poids** : < 40MB

### 2. VERSION MOBILE

#### diayal-teaser-mobile.mp4
- **Durée** : 1 minute 30 secondes
- **Format** : MP4 (H.264)
- **Résolution** : 1080x1920 (9:16) ou 1080x1080 (1:1)
- **Audio** : Oui (musique + voix-off)
- **Poids** : < 30MB (optimisé mobile)
- **Usage** : Écrans < 768px

#### diayal-teaser-mobile.webm
- **Durée** : 1 minute 30 secondes
- **Format** : WebM (VP9)
- **Résolution** : 1080x1920 (9:16) ou 1080x1080 (1:1)
- **Audio** : Oui (musique + voix-off)
- **Poids** : < 25MB

### 3. FALLBACK UNIVERSEL

#### diayal-teaser.mp4
- **Résolution** : 1920x1080 (16:9)
- **Compatibilité** : Maximum
- **Poids** : < 45MB

### 4. IMAGE POSTER

#### diayal-poster.jpg
- **Résolution** : 1920x1080
- **Format** : JPEG optimisé
- **Poids** : < 500KB
- **Usage** : Affichage pendant le chargement

## Contenu suggéré (timeline) :

**0-20s** : Artisans sénégalais au travail
- Couturiers, menuisiers, potiers en action
- Gros plans sur les mains expertes
- Musique traditionnelle sénégalaise moderne

**20-40s** : Produits finis magnifiques
- Showcase des créations
- Détails des finitions
- Transition avec le drapeau sénégalais

**40-60s** : Vision Diayal + technologie
- Logo Diayal qui apparaît
- Interface de la plateforme (mockup)
- "100% Made in Sénégal"

**60-90s** : Call-to-action + lancement
- "Décembre 2024"
- "Rejoignez le mouvement"
- Logo final avec "Teranga numérique"

## 🎨 ADAPTATION MOBILE :

### Différences version mobile :
- **Cadrage** : Plus serré sur les visages et mains
- **Texte** : 30% plus gros que la version desktop
- **Logo** : Centré et plus visible
- **Action** : Zoom sur les détails artisanaux
- **Transitions** : Plus lentes pour la lisibilité

### Éléments à privilégier mobile :
- Gros plans sur les mains d'artisans
- Produits finis en détail
- Logo Diayal bien visible
- Texte "Décembre 2024" centré
- Drapeau sénégalais en transition

## 🎵 AUDIO :
- **Musique** : Rythmes sénégalais modernes (mbalax, afrobeat)
- **Voix-off** : Français/Wolof mix
- **Volume** : Optimisé pour autoplay (pas trop fort)
- **Compression** : Dynamique réduite pour mobile
- **Fréquences** : Optimisées pour haut-parleurs téléphone

## 🛠️ OPTIMISATION TECHNIQUE :

### Compression vidéo :
- **Desktop** : H.264, bitrate 8-12 Mbps
- **Mobile** : H.264, bitrate 4-6 Mbps (plus compressé)
- **Audio** : AAC, 128kbps pour desktop, 96kbps pour mobile
- **Keyframes** : Toutes les 2 secondes

### Formats recommandés par écran :
- **Desktop/Laptop** : 1920x1080 (16:9) - Paysage
- **Tablet** : 1920x1080 (16:9) - Paysage  
- **Mobile Portrait** : 1080x1920 (9:16) - Portrait
- **Mobile Carré** : 1080x1080 (1:1) - Carré (plus sûr)

### Conseils de création :
- **Cadrage mobile** : Éléments importants au centre
- **Texte** : Plus gros sur la version mobile
- **Action** : Concentrée au centre pour le crop automatique
- **Poster** : Frame la plus attractive (logo + artisan)

### Commandes FFmpeg (exemples) :
```bash
# Desktop version
ffmpeg -i source.mp4 -vf scale=1920:1080 -c:v libx264 -b:v 10M -c:a aac -b:a 128k diayal-teaser-desktop.mp4

# Mobile version (portrait)
ffmpeg -i source.mp4 -vf scale=1080:1920 -c:v libx264 -b:v 6M -c:a aac -b:a 96k diayal-teaser-mobile.mp4

# Mobile version (carré - plus sûr)
ffmpeg -i source.mp4 -vf scale=1080:1080 -c:v libx264 -b:v 5M -c:a aac -b:a 96k diayal-teaser-mobile.mp4
```
# 🧪 Test rapide - Correction statut vendeur

## ✅ Correction appliquée

**Problème identifié:** Le client n'écoutait l'événement `activeSeller` qu'une seule fois au montage du composant. Si le vendeur se connectait après, le client ne recevait pas la mise à jour.

**Solution:** Ajout du nettoyage des listeners pour permettre la réception continue des mises à jour.

## 📋 Procédure de test

### 1. Redémarrer le backend
```bash
cd backend
npm start
```

### 2. Redémarrer le frontend
```bash
cd frontend
npm start
```

### 3. Test Scénario A : Client se connecte AVANT le vendeur

1. **Ouvrir le frontend client** (http://localhost:3000)
2. **Se connecter** en tant que client
3. **Ouvrir la console** (F12)
4. **Aller sur le chat** (/dashboard/chat)
5. Vous devriez voir :
   ```
   === DEBUG ACTIVE SELLERS ===
   Active sellers received: Array(0)
   ```

6. **Ouvrir le dashboard vendeur** (http://localhost:3001)
7. **Se connecter** en tant que vendeur (Papou)
8. **Retourner sur le frontend client**
9. **Vérifier la console**, vous devriez maintenant voir :
   ```
   === DEBUG ACTIVE SELLERS ===
   Active sellers received: Array(1)
   Sellers structure: [{
     sellerId: "68a8111f812e09a0bb319884",
     userInfoName: "Papou"
   }]
   ```

10. **Vérifier l'interface** : Le vendeur devrait apparaître "En ligne" ✅

### 4. Test Scénario B : Vendeur se connecte AVANT le client

1. **Ouvrir le dashboard vendeur** (http://localhost:3001)
2. **Se connecter** en tant que vendeur
3. **Ouvrir le frontend client** (http://localhost:3000)
4. **Se connecter** en tant que client
5. **Aller sur le chat**
6. Le vendeur devrait immédiatement apparaître "En ligne" ✅

### 5. Test Scénario C : Déconnexion du vendeur

1. Avec le vendeur "En ligne"
2. **Fermer l'onglet du dashboard vendeur**
3. **Retourner sur le frontend client**
4. Le vendeur devrait passer à "Hors ligne" ✅

## 🔍 Logs attendus

### Backend
```
socket server running.. ID: 4q5pJRzliEPIoKqMAAAL
Client ajouté: 695e2230372ca3a39fbb7a4b
Émission activeSeller vers tous les clients. Vendeurs actifs: 0
Vendeur ajouté au socket: 68a8111f812e09a0bb319884 Papou
Liste des vendeurs actifs: [{ id: '68a8111f812e09a0bb319884', name: 'Papou' }]
Émission activeSeller vers tous les clients. Vendeurs actifs: 1
```

### Frontend Client
```
✅ Socket connecté: 4q5pJRzliEPIoKqMAAAL
=== DEBUG ACTIVE SELLERS ===
Active sellers received: Array(0)
===========================
=== DEBUG ACTIVE SELLERS ===
Active sellers received: Array(1)
Sellers structure: [{
  sellerId: "68a8111f812e09a0bb319884",
  userInfoName: "Papou"
}]
===========================
```

### Dashboard Vendeur
```
Vendeur se connecte au socket: 68a8111f812e09a0bb319884 Papou
Socket connecté? true
Événement add_seller émis
```

## ✅ Résultat attendu

- [ ] Le vendeur apparaît "En ligne" quand il est connecté
- [ ] Le statut se met à jour en temps réel
- [ ] Le vendeur apparaît "Hors ligne" quand il se déconnecte
- [ ] Fonctionne quel que soit l'ordre de connexion (client avant/après vendeur)

## ❌ Si ça ne fonctionne toujours pas

Vérifiez dans les logs `=== DEBUG ACTIVE SELLERS ===` :

1. **Si `sellers.length === 0` même après connexion du vendeur:**
   - Le vendeur n'émet pas `add_seller` correctement
   - Vérifiez MainLayout.jsx dans le dashboard

2. **Si `sellers.length > 0` mais le vendeur reste "Hors ligne":**
   - Les IDs ne correspondent pas
   - Comparez `sellers[0].sellerId` avec `my_friends[0].fdId`
   - Partagez ces valeurs pour diagnostic

3. **Si vous ne voyez pas les logs:**
   - Le socket ne se connecte pas
   - Vérifiez l'URL dans config/socket.js
   - Vérifiez la console pour les erreurs de connexion

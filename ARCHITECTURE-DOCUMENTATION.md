# 📚 Documentation Architecture - PFP HEDS Application

> **Version :** 2.0  
> **Date :** Janvier 2025  
> **Framework :** Vue.js 3 + Firebase + PrimeVue  

---

## 🎯 Vue d'ensemble

L'application PFP HEDS est une plateforme éducative et sociale complète construite avec Vue.js 3, intégrant Firebase pour le backend et PrimeVue pour l'interface utilisateur. Elle combine gestion institutionnelle, fonctionnalités sociales, outils éducatifs et jeux interactifs.

### 🏗️ Architecture Générale

```
pfpheds/
├── 📁 public/                    # Assets statiques
├── 📁 src/                       # Code source principal
│   ├── 📁 assets/               # Ressources (images, fonts, etc.)
│   ├── 📁 components/           # Composants Vue réutilisables
│   ├── 📁 views/               # Pages/Vues principales
│   ├── 📁 hooks/               # Composables Vue
│   ├── 📁 layout/              # Composants de mise en page
│   ├── 📁 service/             # Services et utilitaires
│   ├── 📁 stores/              # Stores Pinia
│   ├── 📁 styles/              # Styles globaux
│   ├── 📄 App.vue              # Composant racine
│   ├── 📄 main.js              # Point d'entrée
│   └── 📄 router.js            # Configuration des routes
├── 📄 firebase.js              # Configuration Firebase
└── 📄 package.json             # Dépendances
```

---

## 📂 Structure Détaillée des Composants

### `/src/components/` - Composants Réutilisables

#### 🎮 `games/` - Jeux Interactifs
```
games/
├── 📄 GameHub.vue              # Hub de sélection des jeux
├── 📄 Ventriglisse3D.vue       # Jeu de luge 3D (Three.js)
├── 📁 assets/                  # Assets du jeu (sons, textures, modèles)
│   ├── 🔊 bip.wav
│   ├── 🔊 go.wav
│   ├── 🔊 slide.mp3
│   ├── 🔊 finish.mp3
│   ├── 🎨 cafte1.png
│   ├── 🎨 cafte2.png
│   ├── 🎨 cafte3.png
│   └── 🎲 jump.glb
├── 📄 participants.json        # Configuration des participants
└── 📄 README.md               # Documentation du jeu
```

**Fonctionnalités :**
- Interface de sélection de jeux avec design glassmorphism
- Jeu Ventriglisse3D avec rendu 3D (Three.js)
- Gestion des participants et avatars
- Système de course avec physique et classement
- Audio intégré (sons de jeu)

#### 🌐 `social/` - Fonctionnalités Sociales
```
social/
├── 📁 library/                 # Composants de base
│   ├── 📄 MainFeed.vue         # Flux principal
│   ├── 📄 PostItem.vue         # Affichage des posts
│   ├── 📄 CreatePostDialog.vue # Création de posts
│   ├── 📄 CommunityFeed.vue    # Flux communautaire
│   ├── 📄 CommunitiesList.vue  # Liste des communautés
│   ├── 📄 PublicCommunitiesList.vue # Communautés publiques
│   ├── 📄 RightSidebar.vue     # Sidebar droite
│   ├── 📄 LeftSidebar.vue      # Sidebar gauche
│   ├── 📄 FilterComponent.vue  # Filtres de contenu
│   ├── 📄 StoryCarousel.vue    # Carrousel de stories
│   └── 📄 CreateContentMobile.vue # Création mobile
└── 📁 forms/                   # Formulaires sociaux
    └── 📄 CreateNewCommunity.vue # Création de communauté
```

**Fonctionnalités :**
- Flux social avec posts, médias, hashtags
- Système de communautés (création, gestion, adhésion)
- Upload de médias (images, vidéos, PDFs)
- Mentions et hashtags automatiques
- Interface responsive (mobile/desktop)
- Intégration Firebase Realtime Database

#### 👤 `user/` - Gestion Utilisateurs
```
user/
├── 📁 details/                 # Détails utilisateur
│   ├── 📄 ProfileInfo.vue      # Informations de profil
│   ├── 📄 ProfileInfoAdmin.vue # Profil admin
│   ├── 📄 DocumentsUserProfile.vue # Documents utilisateur
│   ├── 📄 ResumStageUserProfile.vue # Résumé des stages
│   └── 📄 ChatProfil.vue       # Chat utilisateur
├── 📁 forms/                   # Formulaires utilisateur
└── 📁 profile/                 # Composants de profil
    ├── 📄 CardNameProfile.vue  # Carte nom
    ├── 📄 VotationResultProfil.vue # Résultats votes
    └── 📄 RadarProfil.vue      # Graphique radar
```

#### 🛠️ `admin/` - Administration
```
admin/
├── 📁 details/                 # Détails administratifs
├── 📁 forms/                   # Formulaires admin
├── 📁 tables/                  # Tableaux de données
└── 📁 validation/              # Validation de contenu
```

#### 🎨 `ui/` - Interface Utilisateur
```
ui/
├── 📁 buttons/                 # Boutons personnalisés
│   ├── 📄 ButtonNavbar.vue     # Bouton navigation
│   └── 📄 SwitchColor.vue      # Commutateur couleur
├── 📁 forms/                   # Éléments de formulaire
├── 📁 modals/                  # Modales
└── 📁 navigation/              # Navigation
```

#### 🔧 `common/` - Composants Communs
```
common/
├── 📁 utils/                   # Utilitaires
│   ├── 📄 Navbar.vue           # Barre de navigation
│   ├── 📄 GlobalSearch.vue     # Recherche globale
│   └── 📄 SearchResults.vue    # Résultats de recherche
├── 📁 layout/                  # Mise en page
└── 📁 feedback/                # Retours utilisateur
```

#### 📺 `media/` - Gestion Média
```
media/
└── 📁 audio/                   # Composants audio
    └── 📄 ListComponent.vue    # Liste de lecture
```

---

## 📄 Structure des Vues

### `/src/views/` - Pages Principales

#### 🏠 `home/` - Pages d'Accueil
```
home/
├── 📄 HomeView.vue             # Page d'accueil principale
├── 📄 DashboardView.vue        # Tableau de bord
├── 📄 HistoryView.vue          # Historique utilisateur
└── 📄 ProfileView.vue          # Vue profil
```

#### 👥 `social/` - Pages Sociales
```
social/
├── 📄 SocialView.vue           # Hub social principal
├── 📄 CommunityView.vue        # Vue communauté
├── 📄 CommunityInfoView.vue    # Informations communauté
├── 📄 MentionView.vue          # Mentions
└── 📄 HashtagView.vue          # Hashtags
```

#### 🏢 `institutions/` - Gestion Institutionnelle
```
institutions/
├── 📄 InstitutionListView.vue  # Liste des institutions
└── 📄 InstitutionDetailView.vue # Détails institution
```

#### 🔐 `admin/` - Administration
```
admin/
├── 📁 users/                   # Gestion utilisateurs
├── 📁 institutions/            # Gestion institutions
├── 📁 content/                 # Gestion contenu
└── 📄 AdminDashboard.vue       # Tableau de bord admin
```

#### 📱 `apps/` - Applications Intégrées
```
apps/
├── 📁 tools/                   # Outils
├── 📁 games/                   # Jeux
└── 📁 utilities/               # Utilitaires
```

#### 🔑 `auth/` - Authentification
```
auth/
├── 📄 LoginView.vue            # Connexion
├── 📄 RegisterView.vue         # Inscription
└── 📄 ResetPasswordView.vue    # Réinitialisation
```

---

## 🔧 Services et Configuration

### `/src/service/` - Services
```
service/
├── 📄 firebase.js              # Service Firebase
├── 📄 auth.js                  # Service d'authentification
├── 📄 storage.js               # Service de stockage
└── 📄 api.js                   # Service API
```

### `/src/stores/` - Stores Pinia
```
stores/
├── 📄 auth.js                  # Store authentification
├── 📄 user.js                  # Store utilisateur
└── 📄 app.js                   # Store application
```

### `/src/hooks/` - Composables
```
hooks/
├── 📄 useAuth.js               # Hook authentification
├── 📄 useFirebase.js           # Hook Firebase
└── 📄 useMedia.js              # Hook média
```

---

## 🎨 Styles et Thèmes

### `/src/styles/` - Styles Globaux
```
styles/
├── 📄 main.css                 # Styles principaux
└── 📄 variables.css            # Variables CSS
```

### 🎨 Design System

**Couleurs Principales :**
- `--primary-600` : Couleur principale
- `--primary-700` : Couleur principale foncée
- `--surface-hover` : Couleur de survol

**Composants UI :**
- **PrimeVue** : DataTable, Dialog, Button, InputText, etc.
- **Glassmorphism** : Effets de verre dépoli
- **Responsive Design** : Adaptation mobile/desktop

---

## 🔌 Intégrations Techniques

### 🔥 Firebase
```javascript
// Configuration Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
```

**Services utilisés :**
- **Realtime Database** : Données en temps réel
- **Storage** : Stockage de fichiers
- **Authentication** : Gestion des utilisateurs

### 🎮 Three.js (Jeux)
```javascript
// Intégration Three.js pour Ventriglisse3D
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
```

### 🎨 PrimeVue
```javascript
// Composants PrimeVue utilisés
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
```

---

## 🛣️ Routing et Navigation

### Structure des Routes
```javascript
// Principales catégories de routes
const routes = [
  // Pages publiques
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  
  // Pages utilisateur (auth requise)
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/profile/:id', component: ProfileView, meta: { requiresAuth: true } },
  
  // Pages sociales
  { path: '/social', component: SocialView, meta: { requiresAuth: true } },
  { path: '/community/:id', component: CommunityInfoView },
  
  // Administration (rôle admin requis)
  { path: '/admin/*', meta: { requiresAuth: true, requiredRole: ['admin'] } },
  
  // Jeux
  { path: '/ventriglisse3d', component: Ventriglisse3D },
  { path: '/games', component: GameHub }
];
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile** : `< 768px`
- **Tablet** : `768px - 1024px`
- **Desktop** : `> 1024px`

### Adaptations Mobiles
```css
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main-content { width: 100%; }
  .game-canvas { height: 400px; }
}
```

---

## 🔒 Sécurité et Authentification

### Middleware de Route
```javascript
// Vérification d'authentification
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else if (to.meta.requiredRole && !hasRole(to.meta.requiredRole)) {
    next('/unauthorized');
  } else {
    next();
  }
});
```

### Rôles Utilisateur
- **User** : Utilisateur standard
- **Editor** : Éditeur de contenu
- **Admin** : Administrateur complet

---

## 🚀 Performance et Optimisation

### Lazy Loading
```javascript
// Chargement paresseux des composants
const AdminDashboard = () => import('@/views/admin/AdminDashboard.vue');
```

### Optimisations
- **Code Splitting** : Division du code par routes
- **Tree Shaking** : Élimination du code mort
- **Asset Optimization** : Compression des images et médias
- **Firebase Caching** : Cache des données Firebase

---

## 🧪 Tests et Qualité

### Structure de Tests
```
tests/
├── 📁 unit/                    # Tests unitaires
├── 📁 integration/             # Tests d'intégration
└── 📁 e2e/                     # Tests end-to-end
```

### Outils de Qualité
- **ESLint** : Linting JavaScript/Vue
- **Prettier** : Formatage de code
- **Vue Test Utils** : Tests de composants Vue

---

## 📦 Déploiement

### Build de Production
```bash
npm run build
```

### Variables d'Environnement
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🔄 Workflow de Développement

### 1. Développement Local
```bash
npm run dev
```

### 2. Structure des Commits
```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: mise à jour documentation
style: changements de style
refactor: refactoring de code
```

### 3. Branches
- `main` : Production
- `develop` : Développement
- `feature/*` : Nouvelles fonctionnalités
- `hotfix/*` : Corrections urgentes

---

## 📋 Conventions de Code

### Nomenclature des Composants
```
PascalCase pour les composants : UserProfile.vue
camelCase pour les props : userName
kebab-case pour les événements : user-updated
```

### Structure des Composants Vue
```vue
<template>
  <!-- Template HTML -->
</template>

<script>
// Imports
// Composant definition
// Props, data, computed, methods
// Lifecycle hooks
</script>

<style scoped>
/* Styles scopés */
</style>
```

---

## 🆘 Dépannage Courant

### Problèmes Firebase
```javascript
// Vérifier la configuration Firebase
console.log('Firebase config:', firebaseConfig);
```

### Problèmes de Build
```bash
# Nettoyer le cache
npm run clean
npm install
```

### Problèmes de Routing
```javascript
// Vérifier les routes dans router.js
console.log('Current route:', this.$route);
```

---

## 📚 Ressources et Documentation

### Documentation Officielle
- [Vue.js 3](https://vuejs.org/)
- [Firebase](https://firebase.google.com/docs)
- [PrimeVue](https://primefaces.org/primevue/)
- [Three.js](https://threejs.org/docs/)

### Guides Internes
- `README.md` : Guide de démarrage
- `CONTRIBUTING.md` : Guide de contribution
- `CHANGELOG.md` : Historique des versions

---

## 🎯 Roadmap et Évolutions

### Version Actuelle (2.0)
- ✅ Refactoring complet de l'architecture
- ✅ Intégration des jeux (Ventriglisse3D)
- ✅ Système social complet
- ✅ Interface responsive

### Prochaines Versions
- 🔄 **v2.1** : Nouveaux jeux interactifs
- 🔄 **v2.2** : Amélioration des performances
- 🔄 **v2.3** : Tests automatisés complets
- 🔄 **v3.0** : Migration vers Vue 4 (quand disponible)

---

## 👥 Équipe et Contacts

### Développement
- **Lead Developer** : Antoine Quarroz
- **Architecture** : Cascade AI Assistant

### Support
- **Issues** : GitHub Issues
- **Documentation** : Ce fichier
- **Contact** : [email@domain.com]

---

*Cette documentation est maintenue à jour avec chaque version majeure de l'application. Dernière mise à jour : Janvier 2025*

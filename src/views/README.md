# 📁 STRUCTURE DES VUES - DOCUMENTATION

## 🎯 **ORGANISATION LOGIQUE DES PAGES**

Cette structure sépare clairement les **pages complètes** (views) des **composants réutilisables** (components) pour une meilleure maintenabilité et scalabilité.

---

## 📂 **STRUCTURE ACTUELLE**

### 🔐 **views/auth/** - Pages d'authentification
```
├── LoginHome.vue            # 🏠 Page d'accueil avec login (Firebase)
├── LoginHome2.vue           # 🏠 Page d'accueil avec login (Supabase)
├── LoginView.vue            # 🔐 Page de connexion standard
├── RegisterView.vue         # 📝 Page d'inscription
├── ForgotPasswordView.vue   # 🔑 Mot de passe oublié
├── NewPasswordView.vue      # 🔑 Nouveau mot de passe
├── VerificationView.vue     # ✅ Vérification email/SMS
├── LockScreenView.vue       # 🔒 Écran de verrouillage
├── AccessView.vue           # 🚪 Page d'accès
└── AuthErrorView.vue        # ❌ Erreur d'authentification
```

### 💬 **views/social/** - Pages sociales et communication
```
├── FeedView.vue             # 📱 Feed principal (ex: NewsFeed.vue)
├── HashtagView.vue          # #️⃣ Page hashtag (ex: HashtagPage.vue)
├── MentionView.vue          # 👥 Page mentions (ex: MentionGroupPage.vue)
├── CommunitiesView.vue      # 🏘️ Gestion communautés (ex: CommunityManagement.vue)
├── CommunityView.vue        # 🏘️ Une communauté (ex: ManageOneCommunity.vue)
└── CommunityInfoView.vue    # ℹ️ Info communauté (ex: CommunityInfo.vue)
```

### 👑 **views/admin/** - Administration et dashboard
```
├── DashboardView.vue        # 📊 Dashboard principal (ex: DashbordAdmin.vue)
├── ProfileAdminView.vue     # 👑 Profil administrateur
├── users/                   # 👥 Gestion utilisateurs
│   ├── UserListView.vue     # 📋 Liste utilisateurs
│   ├── StudentListView.vue  # 🎓 Liste étudiants
│   ├── TeacherListView.vue  # 👨‍🏫 Liste enseignants
│   └── TrainerListView.vue  # 🏃‍♂️ Liste praticiens
├── institutions/            # 🏥 Gestion institutions
│   ├── InstitutionListView.vue    # 🏥 Liste institutions
│   └── InstitutionDetailsView.vue # 🏥 Détails institution
├── places/                  # 📍 Gestion places
│   ├── PlaceManagementView.vue    # 📍 Gestion places
│   ├── PlaceAssignmentView.vue    # 📍 Attribution places
│   └── PlaceStatsView.vue         # 📊 Statistiques places
├── votations/               # 🗳️ Gestion votations
│   ├── VotationView.vue           # 🗳️ Vue votation
│   ├── VotationManagementView.vue # 🗳️ Gestion votation
│   └── VotationResultsView.vue    # 📊 Résultats votation
└── validation/              # ✅ Validation
    ├── ValidationView.vue   # ✅ Validation
    └── ReceptionView.vue    # 📥 Réception
```

### 🏠 **views/home/** - Pages d'accueil et navigation principale
```
├── MapView.vue              # 🗺️ Carte interactive (ex: components/Home/Map.vue)
├── FaqView.vue              # ❓ Questions fréquentes (ex: components/Home/Faq.vue)
├── InfoExterneView.vue      # 🔗 Informations externes (ex: components/Utils/InfoExterne.vue)
├── TermsView.vue            # 📄 Conditions d'utilisation (ex: components/Utils/TermsOfUse.vue)
├── HistoryView.vue          # 📚 Historique PFP (ex: components/Home/HistoriquePFP.vue)
└── DocumentsView.vue        # 📋 Documents PFP (ex: components/Home/DocumentsPFP.vue)
```

### 🏥 **views/institutions/** - Gestion des institutions et places
```
├── InstitutionListView.vue  # 🏥 Liste des institutions (ex: components/Home/Institution.vue)
└── PlaceListView.vue        # 📍 Liste des places (ex: components/Home/Place.vue)
```

### 👤 **views/users/** - Gestion des utilisateurs
```
├── ProfileView.vue          # 👤 Profil utilisateur (ex: components/Home/Profile.vue)
└── SettingsView.vue         # ⚙️ Paramètres utilisateur (ex: components/Home/SettingView.vue)
```

---

## 🔗 **ROUTES CORRESPONDANTES**

| Route | Composant | Description |
|-------|-----------|-------------|
| **🔐 AUTHENTIFICATION** | | |
| `/` | LoginHome | Page d'accueil principale (Firebase) |
| `/home` | LoginHome | Page d'accueil alternative (Firebase) |
| `/home2` | LoginHome2 | Page d'accueil (Supabase) |
| `/login` | LoginView | Connexion standard |
| `/register` | RegisterView | Inscription |
| `/forgot-password` | ForgotPasswordView | Mot de passe oublié |
| `/new-password` | NewPasswordView | Nouveau mot de passe |
| `/verification` | VerificationView | Vérification email/SMS |
| `/lock-screen` | LockScreenView | Écran de verrouillage |
| `/access` | AccessView | Page d'accès |
| `/auth-error` | AuthErrorView | Erreur d'authentification |
| **💬 SOCIAL** | | |
| `/feed` | FeedView | Feed principal |
| `/hashtag` | HashtagView | Page hashtag |
| `/mention` | MentionView | Page mentions |
| `/communities` | CommunitiesView | Gestion communautés |
| `/community` | CommunityView | Une communauté |
| `/community-info` | CommunityInfoView | Info communauté |
| **👑 ADMINISTRATION** | | |
| `/admin` | DashboardView | Dashboard principal |
| `/user_list` | UserListView | Liste utilisateurs |
| `/etudiant_list` | StudentListView | Liste étudiants |
| `/enseignent_list` | TeacherListView | Liste enseignants |
| `/praticien_formateur_list` | TrainerListView | Liste praticiens |
| `/institution_list` | InstitutionListView | Liste institutions |
| `/institution_details/:id` | InstitutionDetailsView | Détails institution |
| `/management_places` | PlaceManagementView | Gestion places |
| `/places_assignment` | PlaceAssignmentView | Attribution places |
| `/stats_place_pfp` | PlaceStatsView | Statistiques places |
| `/votation` | VotationView | Vue votation |
| `/votation_management` | VotationManagementView | Gestion votation |
| `/result_preview_votation` | VotationResultsView | Résultats votation |
| `/validation` | ValidationView | Validation |
| `/reception` | ReceptionView | Réception |
| **🏠 PAGES PRINCIPALES** | | |
| `/map` | MapView | Carte interactive |
| `/institution` | InstitutionListView | Liste des institutions |
| `/place` | PlaceListView | Liste des places |
| `/faq` | FaqView | Questions fréquentes |
| `/terms_of_use` | TermsView | Conditions d'utilisation |
| `/info_externe` | InfoExterneView | Informations externes |
| `/history` | HistoryView | Historique PFP |
| `/documents` | DocumentsView | Documents PFP |
| **👤 UTILISATEURS** | | |
| `/profile/:id` | ProfileView | Profil utilisateur |
| `/settings` | SettingsView | Paramètres utilisateur |
| `/profilAdmin/:id` | ProfileAdminView | Profil administrateur |

---

## ✅ **AVANTAGES DE CETTE STRUCTURE**

### 🎯 **Séparation claire des responsabilités**
- **Views** = Pages complètes avec routes
- **Components** = Éléments réutilisables

### 📈 **Scalabilité**
- Structure qui grandit naturellement
- Ajout facile de nouvelles sections

### 🔍 **Navigation intuitive**
- Organisation thématique logique
- Facile de trouver n'importe quel fichier

### 🔧 **Maintenabilité**
- Modifications isolées par domaine
- Code plus organisé et lisible

---

## 🚀 **PROCHAINES ÉTAPES RECOMMANDÉES**

1. **🔐 Authentification** - Organiser les pages de connexion
2. **💬 Social** - Structurer les pages sociales
3. **📊 Dashboard** - Organiser les tableaux de bord
4. **📱 Applications** - Structurer les apps intégrées

---

## 📝 **RÈGLES DE DÉVELOPPEMENT**

### ✅ **À FAIRE**
- Placer les nouvelles pages dans `views/`
- Utiliser des noms descriptifs avec suffixe `View`
- Grouper par domaine fonctionnel
- Documenter les nouvelles routes

### ❌ **À ÉVITER**
- Mélanger pages et composants
- Créer des structures trop profondes
- Utiliser des noms génériques
- Oublier de mettre à jour le router

---

*📅 Dernière mise à jour : 29/07/2025*
*👨‍💻 Structure créée pour une meilleure organisation et scalabilité*

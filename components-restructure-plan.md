# 🔧 PLAN DE RESTRUCTURATION DES COMPONENTS

## 📊 **STRUCTURE ACTUELLE ANALYSÉE**

### **✅ DOSSIERS À CONSERVER ET RÉORGANISER** :

#### **🏠 UI/INTERFACE** :
- `BlockViewer.vue` → `ui/BlockViewer.vue`
- `ConvaiWidget.vue` → `ui/ConvaiWidget.vue` 
- `QrCodeGenerator.vue` → `ui/QrCodeGenerator.vue`
- `Template/` → `ui/templates/`

#### **🔧 UTILITAIRES** :
- `Utils/` → `common/utils/` (11 fichiers)
- `Filters/` → `common/filters/` (4 fichiers)

#### **👤 PROFILS & UTILISATEURS** :
- `Profile/` → `user/profile/` (2 fichiers)
- `UserProfile/` → `user/details/` (8 fichiers)

#### **📊 ADMINISTRATION** :
- `Dashboard/` → `admin/` (56 fichiers)
  - `DashboardDetails/` → `admin/details/`
  - `DashboardForms/` → `admin/forms/`
  - `DashboardItems/` → `admin/items/`
  - `DashboardList/` → `admin/lists/`

#### **💬 SOCIAL & COMMUNICATION** :
- `Social/` → `social/` (12 fichiers)
- `Bibliotheque/Social/` → `social/library/` (19 fichiers)

#### **🏠 PAGES D'ACCUEIL** :
- `Home/` → `home/` (5 fichiers)

#### **🏥 INSTITUTIONS** :
- `Institutions/` → `institutions/` (2 fichiers)

#### **🎉 ÉVÉNEMENTS** :
- `Events/` → `events/` (3 fichiers)

#### **📝 NOTES & ÉDITEUR** :
- `Notes/` → `editor/notes/` (4 fichiers)
- `tiptap-*` → `editor/tiptap/` (tous les dossiers TipTap)

#### **🔌 PLUGINS & EXTENSIONS** :
- `plugins/` → `plugins/` (1 fichier)

#### **📚 BIBLIOTHÈQUE SPÉCIALISÉE** :
- `Bibliotheque/Profile/` → `user/library/` (2 fichiers)
- `Bibliotheque/Buttons/` → `ui/buttons/` (3 fichiers)
- `Bibliotheque/SoundBox/` → `media/audio/` (1 fichier)

## 🎯 **NOUVELLE STRUCTURE PROPOSÉE** :

```
components/
├── admin/           # Administration (Dashboard restructuré)
│   ├── details/     # Détails et vues spécifiques
│   ├── forms/       # Formulaires d'administration
│   ├── items/       # Éléments d'interface admin
│   └── lists/       # Listes et tableaux
├── common/          # Composants communs
│   ├── filters/     # Filtres réutilisables
│   └── utils/       # Utilitaires généraux
├── editor/          # Éditeur de texte
│   ├── notes/       # Composants de notes
│   └── tiptap/      # Éditeur TipTap complet
├── events/          # Gestion des événements
├── home/            # Composants d'accueil
├── institutions/    # Composants institutions
├── media/           # Médias et contenu
│   └── audio/       # Composants audio
├── plugins/         # Extensions et plugins
├── social/          # Composants sociaux
│   └── library/     # Bibliothèque sociale
├── ui/              # Interface utilisateur
│   ├── buttons/     # Boutons spécialisés
│   └── templates/   # Templates d'interface
└── user/            # Gestion utilisateurs
    ├── details/     # Profils détaillés
    ├── library/     # Bibliothèque utilisateur
    └── profile/     # Profils de base
```

## 🚀 **AVANTAGES DE CETTE STRUCTURE** :

- ✅ **Logique thématique** : Regroupement par domaine fonctionnel
- ✅ **Séparation claire** : Admin, Social, UI, User séparés
- ✅ **Réutilisabilité** : Composants communs centralisés
- ✅ **Maintenance** : Structure prévisible et navigable
- ✅ **Scalabilité** : Facile d'ajouter de nouveaux composants
- ✅ **Performance** : Imports plus ciblés possible

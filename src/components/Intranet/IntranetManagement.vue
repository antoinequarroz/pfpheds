<!-- 
src/components/Intranet/Intranet.vue
-->

<template>
    <div class="intranet-container">
      <!-- Intégration de la NavBar -->
      <NavBar />
  
      <!-- Conteneur principal avec sidebar gauche, contenu principal et sidebar droite -->
      <div class="intranet-layout">
        <!-- Barre latérale gauche pour la navigation des rôles -->
        <aside class="sidebar-left">
          <IntranetSidebarLeft @role-selected="handleRoleSelection" />
        </aside>
  
        <!-- Contenu principal -->
        <main class="main-content">
          <header>
            <h1>Intranet</h1>
            <p>Sélectionnez un rôle dans le menu de gauche pour accéder aux ressources.</p>
          </header>
  
          <section>
            <!-- Afficher le composant en fonction du rôle sélectionné -->
            <IntranetInfirmier 
              v-if="currentRole === 'infirmier'"
              :links="infirmierLinks"
            />
            <IntranetPhysio 
              v-else-if="currentRole === 'physio'"
              :links="physioLinks"
            />
            <p v-else>Veuillez sélectionner un rôle dans le menu de gauche.</p>
          </section>
        </main>
  
        <!-- Barre latérale droite pour des informations supplémentaires -->
        <aside class="sidebar-right">
          <IntranetSidebarRight :current-role="currentRole" />
        </aside>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Import des composants
  import NavBar from '@/components/Utils/NavBar.vue';
  import IntranetSidebarLeft from './sub/IntranetSidebarLeft.vue';
  import IntranetSidebarRight from './sub/IntranetSidebarRight.vue';
  import IntranetInfirmier from './roles/IntranetInfirmier.vue';
  import IntranetPhysio from './roles/IntranetPhysio.vue';
  
  // État local pour le rôle actuel
  const currentRole = ref(null);
  
  // Exemple de liens et informations pour chaque rôle
  const infirmierLinks = [
    { name: 'Planning de Garde', url: '/planning-garde' },
    { name: 'Protocoles Médicaux', url: '/protocoles-medicaux' },
    { name: 'Formation Continue', url: '/formation-continue' },
  ];
  
  const physioLinks = [
    { name: 'Agenda des Sessions', url: '/agenda-sessions' },
    { name: 'Ressources Thérapeutiques', url: '/ressources-therapeutiques' },
    { name: 'Développement Professionnel', url: '/developpement-professionnel' },
  ];
  
  // Méthode pour gérer la sélection du rôle
  const handleRoleSelection = (role) => {
    currentRole.value = role;
  };
  </script>
  
  <style scoped>
  .intranet-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .intranet-layout {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 1rem;
    flex: 1;
    padding: 1rem;
  }
  
  .sidebar-left,
  .sidebar-right {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 1rem;
    overflow-y: auto;
  }
  
  .main-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-content header h1 {
    margin: 0;
    color: #2c3e50;
  }
  
  p, h1, h2, span, li, ul {
    color: black;
  }
  </style>
  
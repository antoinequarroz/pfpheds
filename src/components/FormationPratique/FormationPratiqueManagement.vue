<!-- 
e:\OneDrive - HESSO\Bureau\optionmodule\pfpheds-main\src\components\FormationPratique\FormationPratiqueManagement.vue
-->

<template>
      <NavBar/>

    <div class="formation-pratique-layout">
      <!-- Barre latérale gauche -->
      <aside class="sidebar-left">
        <FormationPratiqueSidebarLeft
          :current-role="currentRole"
          :current-view="currentView"
          @update-selection="handleSelection"
        />
      </aside>
  
      <!-- Contenu principal -->
      <main class="main-content">
        <header>
          <h1>Formation Pratique - Management</h1>
          <p>Sélectionnez un rôle et une vue dans le menu de gauche.</p>
        </header>
  
        <section>
          <!-- ADMIN -->
          <template v-if="currentRole === 'admin'">
            <AdminFormationPratiqueView
              :formation-data="formationData"
              v-if="currentView === 'adminDashboard'"
            />
          </template>
  
          <!-- ENSEIGNANT -->
          <template v-else-if="currentRole === 'enseignant'">
            <EnseignantFormationPratiqueView
              :formation-data="formationData"
              v-if="currentView === 'enseignantDashboard'"
            />
          </template>
  
          <!-- ETUDIANT -->
          <template v-else-if="currentRole === 'etudiant'">
            <EtudiantFormationPratiqueView
              :formation-data="formationData"
              v-if="currentView === 'etudiantDashboard'"
            />
          </template>
  
          <!-- PRACTIFIENFORMATIERU -->
          <template v-else-if="currentRole === 'practifienformatieru'">
            <PractifienFormatieruFormationPratiqueView
              :formation-data="formationData"
              v-if="currentView === 'practifienFormatieruDashboard'"
            />
          </template>
  
          <!-- Rien de sélectionné -->
          <p v-else>Veuillez sélectionner un rôle / vue dans le menu.</p>
        </section>
      </main>
  
      <!-- Barre latérale droite -->
      <aside class="sidebar-right">
        <FormationPratiqueSidebarRight :formation-data="formationData" />
      </aside>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  // Barres latérales
  import FormationPratiqueSidebarLeft from './sub/FormationPratiqueSidebarLeft.vue';
  import NavBar from '@/components/Utils/NavBar.vue';
  import FormationPratiqueSidebarRight from './sub/FormationPratiqueSidebarRight.vue';
  
  // Rôles
  import AdminFormationPratiqueView from './roles/admin/AdminFormationPratiqueView.vue';
  import EnseignantFormationPratiqueView from './roles/enseignant/EnseignantFormationPratiqueView.vue';
  import EtudiantFormationPratiqueView from './roles/etudiant/EtudiantFormationPratiqueView.vue';
  import PractifienFormatieruFormationPratiqueView from './roles/practifienformatieru/PractifienFormatieruFormationPratiqueView.vue';
  
  export default {
    name: 'FormationPratiqueManagement',
    components: {
      FormationPratiqueSidebarLeft,
      FormationPratiqueSidebarRight,
      AdminFormationPratiqueView,
      EnseignantFormationPratiqueView,
      EtudiantFormationPratiqueView,
      PractifienFormatieruFormationPratiqueView,
      NavBar,
    },
    setup() {
      const currentRole = ref(null);
      const currentView = ref(null);
  
      // Exemple de données
      const formationData = ref([
        {
          id: 1,
          title: 'Formation Vue.js avancée',
          date: '2025-04-10',
          formateur: 'Dr. X',
          description: 'Approfondir le framework Vue.js',
        },
        {
          id: 2,
          title: 'Session Node.js',
          date: '2025-04-15',
          formateur: 'Mme. Y',
          description: 'Pratique sur les API REST et microservices',
        },
      ]);
  
      const handleSelection = ({ role, view }) => {
        currentRole.value = role;
        currentView.value = view;
      };
  
      return {
        currentRole,
        currentView,
        formationData,
        handleSelection
      };
    }
  };
  </script>
  
  <style scoped>
  .formation-pratique-layout {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 1rem;
    min-height: 100vh;
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
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
  
<template>
    <Navbar />
  
    <div class="gestion-calendar-layout">
      <!-- Barre latérale gauche -->
      <aside class="sidebar-left">
        <ManagementAccueilSidebar
          :current-role="currentRole"
          :current-view="currentView"
          @update-selection="handleSelection"
        />
      </aside>
  
      <!-- Contenu principal -->
      <main class="main-content">
        <header>
          <h1>Calendrier Management</h1>
          <p>Sélectionnez un rôle et une vue dans le menu de gauche.</p>
        </header>
  
        <section>
          <!-- Secrétariat -->
          <template v-if="currentRole === 'secretariat'">
            <SecretaireCalendarView
              v-if="currentView === 'VueCalendrier'"
              :calendar-data="calendarData"
            />
            <SecretaireModulesView
              v-else-if="currentView === 'PageCalendrierModule'"
              :calendar-data="calendarData"
              :enseignants="enseignants"
            />
          </template>
  
          <!-- Responsable Module -->
          <template v-else-if="currentRole === 'responsableModule'">
            <ResponsableModuleCalendarView
              v-if="currentView === 'VueCalendrier'"
              :calendar-data="calendarData"
            />
            <ResponsableModuleModulesView
              v-else-if="currentView === 'VueModule'"
              :calendar-data="calendarData"
            />
            <ResponsableModuleModificationView
              v-else-if="currentView === 'ModificationModule'"
              :calendar-data="calendarData"
            />
          </template>
  
          <!-- Enseignant -->
          <template v-else-if="currentRole === 'enseignant'">
            <EnseignantCalendarView
              v-if="currentView === 'VueCalendrier'"
              :calendar-data="calendarData"
            />
            <EnseignantCoursView
              v-else-if="currentView === 'CoursDonnes'"
              :calendar-data="calendarData"
            />
            <EnseignantSyllabusView
              v-else-if="currentView === 'ModificationSyllabus'"
              :calendar-data="calendarData"
            />
          </template>
  
          <!-- Étudiant -->
          <template v-else-if="currentRole === 'etudiant'">
            <EtudiantCalendarView
              v-if="currentView === 'VueCalendrier'"
              :calendar-data="calendarData"
            />
            <EtudiantModuleView
              v-else-if="currentView === 'VueModule'"
              :calendar-data="calendarData"
            />
          </template>
  
          <!-- Rien de sélectionné -->
          <p v-else>Veuillez sélectionner un rôle / vue dans le menu.</p>
        </section>
      </main>
  
      <!-- Barre latérale droite (optionnelle) -->
      <aside class="sidebar-right">
        <CalendarRightbar :calendar-data="calendarData" />
      </aside>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Utils/Navbar.vue';
  
  // Barre latérale
  import ManagementAccueilSidebar from './sub/ManagementAccueilSidebar.vue';
  // Barre latérale droite
  import CalendarRightbar from './sub/CalendarRightbar.vue';
  
  // --- Sous-composants SECRÉTARIAT ---
  import SecretaireCalendarView from './roles/secretariat/SecretaireCalendarView.vue';
  import SecretaireModulesView from './roles/secretariat/SecretaireModulesView.vue';
  
  // --- Sous-composants RESPONSABLE MODULE ---
  import ResponsableModuleCalendarView from './roles/responsableModule/ResponsableModuleCalendarView.vue';
  import ResponsableModuleModulesView from './roles/responsableModule/ResponsableModuleModulesView.vue';
  import ResponsableModuleModificationView from './roles/responsableModule/ResponsableModuleModificationView.vue';
  
  // --- Sous-composants ENSEIGNANT ---
  import EnseignantCalendarView from './roles/enseignant/EnseignantCalendarView.vue';
  import EnseignantCoursView from './roles/enseignant/EnseignantCoursView.vue';
  import EnseignantSyllabusView from './roles/enseignant/EnseignantSyllabusView.vue';
  
  // --- Sous-composants ÉTUDIANT ---
  import EtudiantCalendarView from './roles/etudiant/EtudiantCalendarView.vue';
  import EtudiantModuleView from './roles/etudiant/EtudiantModuleView.vue';
  
  export default {
    name: 'GestionCalendarManagement',
    components: {
      Navbar,
      ManagementAccueilSidebar,
      CalendarRightbar,
  
      // Secrétariat
      SecretaireCalendarView,
      SecretaireModulesView,
  
      // Responsable Module
      ResponsableModuleCalendarView,
      ResponsableModuleModulesView,
      ResponsableModuleModificationView,
  
      // Enseignant
      EnseignantCalendarView,
      EnseignantCoursView,
      EnseignantSyllabusView,
  
      // Étudiant
      EtudiantCalendarView,
      EtudiantModuleView,
    },
    data() {
      return {
        currentRole: null,
        currentView: null,
        // Exemple de données. À adapter à vos besoins ou à connecter à une API.
        calendarData: [
          {
            id: 1,
            title: 'Cours de Vue.js',
            date: '2025-02-01',
            enseignant: 'M. Dupont',
            description: 'Introduction à Vue.js'
          },
          {
            id: 2,
            title: 'Cours de Node.js',
            date: '2025-02-02',
            enseignant: 'Mme. Martin',
            description: 'Création d’une API REST'
          },
        ],
        enseignants: ['M. Dupont', 'Mme. Martin', 'Dr. Smith'],
      };
    },
    methods: {
      handleSelection({ role, view }) {
        this.currentRole = role;
        this.currentView = view;
      },
    }
  };
  </script>
  
  <style scoped>
  .gestion-calendar-layout {
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
  
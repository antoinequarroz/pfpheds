<template>
    <div class="management-accueil-sidebar">
      <header>
        <h2>Calendrier Management</h2>
      </header>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('secretariat')">Secrétariat</span>
        <div v-if="isOpenRole('secretariat')" class="sub-menu">
          <span @click="selectView('secretariat', 'VueCalendrier')">Vue Calendrier</span>
          <span @click="selectView('secretariat', 'PageCalendrierModule')">Page calendrier module & liste enseignants</span>
        </div>
      </div>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('responsableModule')">Responsable Module</span>
        <div v-if="isOpenRole('responsableModule')" class="sub-menu">
          <span @click="selectView('responsableModule', 'VueCalendrier')">Vue Calendrier</span>
          <span @click="selectView('responsableModule', 'VueModule')">Vue Module</span>
          <span @click="selectView('responsableModule', 'ModificationModule')">Modification module (ajout cours, titre, heure)</span>
        </div>
      </div>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('enseignant')">Enseignant</span>
        <div v-if="isOpenRole('enseignant')" class="sub-menu">
          <span @click="selectView('enseignant', 'VueCalendrier')">Vue Calendrier</span>
          <span @click="selectView('enseignant', 'CoursDonnes')">Cours donnés</span>
          <span @click="selectView('enseignant', 'ModificationSyllabus')">Modification Syllabus</span>
        </div>
      </div>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('etudiant')">Étudiant</span>
        <div v-if="isOpenRole('etudiant')" class="sub-menu">
          <span @click="selectView('etudiant', 'VueCalendrier')">Vue Calendrier</span>
          <span @click="selectView('etudiant', 'VueModule')">Vue Module</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ManagementAccueilSidebar',
    props: {
      currentRole: {
        type: String,
        default: null
      },
      currentView: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        openRoles: []
      };
    },
    methods: {
      toggleRole(role) {
        // Ouvre/ferme la section du rôle
        if (this.openRoles.includes(role)) {
          this.openRoles = this.openRoles.filter(r => r !== role);
        } else {
          this.openRoles.push(role);
        }
      },
      isOpenRole(role) {
        return this.openRoles.includes(role);
      },
      selectView(role, view) {
        // Émet un événement vers le parent avec { role, view }
        this.$emit('update-selection', { role, view });
      }
    }
  };
  </script>
  
  <style scoped>
  .management-accueil-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .management-accueil-sidebar header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .role-item {
    margin-bottom: 1rem;
  }
  
  .role-title {
    cursor: pointer;
    color: #2980b9;
    font-weight: bold;
  }
  
  .role-title:hover {
    text-decoration: underline;
  }
  
  .sub-menu {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
  }
  
  .sub-menu span {
    display: block;
    cursor: pointer;
    color: #34495e;
    margin: 0.25rem 0;
  }
  
  .sub-menu span:hover {
    text-decoration: underline;
  }
  
  p, h1, h2, span {
    color: black;
  }
  </style>
  
<!-- 
e:\OneDrive - HESSO\Bureau\optionmodule\pfpheds-main\src\components\FormationPratique\sub\FormationPratiqueSidebarLeft.vue
-->

<template>
    <div class="formation-pratique-sidebar-left">
      <header>
        <h2>Formation Pratique NavBar</h2>
      </header>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('admin')">Admin</span>
        <div v-if="isOpenRole('admin')" class="sub-menu">
          <span @click="selectView('admin', 'adminDashboard')">Dashboard Admin</span>
        </div>
      </div>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('enseignant')">Enseignant</span>
        <div v-if="isOpenRole('enseignant')" class="sub-menu">
          <span @click="selectView('enseignant', 'enseignantDashboard')">Dashboard Enseignant</span>
        </div>
      </div>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('etudiant')">Étudiant</span>
        <div v-if="isOpenRole('etudiant')" class="sub-menu">
          <span @click="selectView('etudiant', 'etudiantDashboard')">Dashboard Étudiant</span>
        </div>
      </div>
  
      <div class="role-item">
        <span class="role-title" @click="toggleRole('practifienformatieru')">Practifienformatieru</span>
        <div v-if="isOpenRole('practifienformatieru')" class="sub-menu">
          <span @click="selectView('practifienformatieru', 'practifienFormatieruDashboard')">
            Dashboard Practifienformatieru
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'FormationPratiqueSidebarLeft',
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
    setup(props, { emit }) {
      const openRoles = ref([]);
  
      const toggleRole = (role) => {
        if (openRoles.value.includes(role)) {
          openRoles.value = openRoles.value.filter(r => r !== role);
        } else {
          openRoles.value.push(role);
        }
      };
  
      const isOpenRole = (role) => {
        return openRoles.value.includes(role);
      };
  
      const selectView = (role, view) => {
        emit('update-selection', { role, view });
      };
  
      return {
        openRoles,
        toggleRole,
        isOpenRole,
        selectView
      };
    }
  };
  </script>
  
  <style scoped>
  p {color:black;}
  .formation-pratique-sidebar-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .formation-pratique-sidebar-left header h2 {
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
  
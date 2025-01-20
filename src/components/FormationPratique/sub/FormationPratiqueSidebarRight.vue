<!-- 
e:\OneDrive - HESSO\Bureau\optionmodule\pfpheds-main\src\components\FormationPratique\sub\FormationPratiqueSidebarRight.vue
-->

<template>
    <div class="formation-pratique-sidebar-right">
      <header>
        <h2>Outils &amp; Statistiques</h2>
      </header>
  
      <section class="stats-section">
        <h3>Statistiques</h3>
        <ul>
          <li>Total Formations : {{ totalFormations }}</li>
        </ul>
      </section>
  
      <section class="actions-section">
        <h3>Actions rapides</h3>
        <button @click="importFormation">Importer Liste</button>
        <button @click="exportFormation">Exporter (CSV)</button>
      </section>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    name: 'FormationPratiqueSidebarRight',
    props: {
      formationData: {
        type: Array,
        default: () => []
      }
    },
    setup(props) {
      const totalFormations = computed(() => props.formationData.length);
  
      const importFormation = () => {
        alert('Import de la liste de formations (à implémenter).');
      };
  
      const exportFormation = () => {
        alert('Export de la liste de formations en CSV (à implémenter).');
      };
  
      return {
        totalFormations,
        importFormation,
        exportFormation
      };
    }
  };
  </script>
  
  <style scoped>
  .formation-pratique-sidebar-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .formation-pratique-sidebar-right header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .stats-section h3,
  .actions-section h3 {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .stats-section ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  
  .stats-section li {
    margin-bottom: 0.25rem;
  }
  
  .actions-section button {
    background-color: #16a085;
    border: none;
    color: #ffffff;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .actions-section button:hover {
    background-color: #138f76;
  }
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
  
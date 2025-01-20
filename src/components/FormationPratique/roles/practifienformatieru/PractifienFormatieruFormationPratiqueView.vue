<!-- 
e:\OneDrive - HESSO\Bureau\optionmodule\pfpheds-main\src\components\FormationPratique\roles\practifienformatieru\PractifienFormatieruFormationPratiqueView.vue
-->

<template>
    <div class="practifien-formatieru-formation-pratique-view">
      <h2>Practifienformatieru - Dashboard</h2>
      <p>Exemple de vue pour le rôle “practifienformatieru”.</p>
  
      <div class="formation-list">
        <div
          v-for="formation in formationData"
          :key="formation.id"
          class="formation-item"
        >
          <h3>{{ formation.title }} ({{ formation.date }})</h3>
          <p><strong>Description :</strong> {{ formation.description }}</p>
          <p><strong>Formateur :</strong> {{ formation.formateur }}</p>
  
          <!-- Exemple d'action spécifique -->
          <button @click="someAction(formation.id)">Action Spécifique</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PractifienFormatieruFormationPratiqueView',
    props: {
      formationData: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      someAction(id) {
        alert(`Action spécifique au rôle Practifienformatieru pour ID #${id}`);
        // Implémentez la logique souhaitée
      }
    }
  };
  </script>
  
  <style scoped>
  .practifien-formatieru-formation-pratique-view .formation-list {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .formation-item {
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 1rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
  
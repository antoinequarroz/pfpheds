<!-- 
e:\OneDrive - HESSO\Bureau\optionmodule\pfpheds-main\src\components\FormationPratique\roles\admin\AdminFormationPratiqueView.vue
-->

<template>
    <div class="admin-formation-pratique-view">
      <h2>Admin - Gestion des Formations</h2>
      <p>Accès complet pour la gestion des sessions de formation.</p>
  
      <div class="formation-list">
        <div
          v-for="formation in formationData"
          :key="formation.id"
          class="formation-item"
        >
          <h3>{{ formation.title }} ({{ formation.date }})</h3>
          <p><strong>Description :</strong> {{ formation.description }}</p>
          <p><strong>Formateur :</strong> {{ formation.formateur }}</p>
  
          <button @click="modifyFormation(formation)">Modifier</button>
          <button @click="deleteFormation(formation.id)">Supprimer</button>
        </div>
      </div>
  
      <button @click="createFormation">Créer une nouvelle formation</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminFormationPratiqueView',
    props: {
      formationData: {
        type: Array,
        default: () => []
      }
    },
    emits: ['update-formation'], // si vous voulez émettre des événements
    methods: {
      createFormation() {
        alert('Logique pour créer une nouvelle formation (via API, store, etc.)');
      },
      modifyFormation(formation) {
        alert(`Modification de la formation : ${formation.title}`);
        // Émettre un événement ou appeler une fonction d’API
      },
      deleteFormation(id) {
        alert(`Suppression de la formation ID: ${id}`);
        // Idem, appel API ou événement
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-formation-pratique-view .formation-list {
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
  
  .formation-item h3 {
    margin: 0;
  }
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
  
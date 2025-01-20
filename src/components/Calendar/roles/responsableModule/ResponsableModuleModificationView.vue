<template>
    <div>
      <h2>Responsable Module - Modification Module</h2>
      <p>Exemple de formulaire pour ajouter un cours / modifier titre et heure.</p>
  
      <div v-for="evt in calendarData" :key="evt.id" class="module-item">
        <h3>{{ evt.title }} ({{ evt.date }})</h3>
        <input 
          v-model="titleUpdates[evt.id]" 
          :placeholder="evt.title" 
          @input="updateTitle(evt.id)"
        />
        <!-- Vous pouvez ajouter d’autres champs comme l’heure, etc. -->
      </div>
  
      <button @click="addCourse">Ajouter un nouveau cours</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ResponsableModuleModificationView',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        titleUpdates: {}
      };
    },
    methods: {
      updateTitle() {
        // Simple exemple : stocker la nouvelle valeur
        // Dans un cas réel, on ferait un @emit ou un appel API
      },
      addCourse() {
        alert('Logique pour ajouter un nouveau cours (ex: API, store, etc.)');
      }
    }
  };
  </script>
  
  <style scoped>
  .module-item {
    margin-bottom: 1rem;
  }
  </style>
  <style>
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
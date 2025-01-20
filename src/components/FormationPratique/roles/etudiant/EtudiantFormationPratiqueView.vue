<!-- 
e:\OneDrive - HESSO\Bureau\optionmodule\pfpheds-main\src\components\FormationPratique\roles\etudiant\EtudiantFormationPratiqueView.vue
-->

<template>
    <div class="etudiant-formation-pratique-view">
      <h2>Étudiant - Formations Disponibles</h2>
      <p>L’étudiant peut consulter les prochaines formations.</p>
  
      <ul>
        <li v-for="formation in formationData" :key="formation.id">
          <strong>{{ formation.title }}</strong> - {{ formation.date }}  
          (Formateur : {{ formation.formateur }})
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EtudiantFormationPratiqueView',
    props: {
      formationData: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>
  
  <style scoped>
  .etudiant-formation-pratique-view ul {
    list-style: none;
    padding: 0;
  }
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
  
<!-- 
e:\OneDrive - HESSO\Bureau\optionmodule\pfpheds-main\src\components\FormationPratique\roles\enseignant\EnseignantFormationPratiqueView.vue
-->

<template>
    <div class="enseignant-formation-pratique-view">
      <h2>Enseignant - Mes Formations</h2>
      <p>Ici, l’enseignant peut consulter ou modifier ses formations.</p>
  
      <div class="formation-list">
        <div
          v-for="formation in myFormations"
          :key="formation.id"
          class="formation-item"
        >
          <h3>{{ formation.title }} ({{ formation.date }})</h3>
          <p><strong>Description :</strong> {{ formation.description }}</p>
  
          <label>Syllabus / Contenu :</label>
          <textarea
            v-model="syllabusUpdates[formation.id]"
            placeholder="Contenu détaillé"
          ></textarea>
  
          <button @click="saveSyllabus(formation.id)">Enregistrer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EnseignantFormationPratiqueView',
    props: {
      formationData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        syllabusUpdates: {}
      };
    },
    computed: {
      // Filtre selon l’enseignant courant (ex: "Dr. X")
      myFormations() {
        const currentTeacher = 'Dr. X';
        return this.formationData.filter(f => f.formateur === currentTeacher);
      }
    },
    methods: {
      saveSyllabus(formationId) {
        const newContent = this.syllabusUpdates[formationId] || '';
        alert(`Syllabus sauvegardé pour la formation #${formationId} :\n${newContent}`);
        // Appel API ou event
      }
    }
  };
  </script>
  
  <style scoped>
  .enseignant-formation-pratique-view .formation-list {
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
  
  .formation-item textarea {
    width: 100%;
    height: 80px;
    margin: 0.5rem 0;
  }
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
  
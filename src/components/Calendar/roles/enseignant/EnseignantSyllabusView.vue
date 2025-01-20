<template>
    <div>
      <h2>Enseignant - Modification Syllabus</h2>
      <p>Formulaire pour ajouter / modifier le syllabus pour chaque cours.</p>
  
      <div v-for="evt in myCourses" :key="evt.id" class="syllabus-item">
        <h3>{{ evt.title }} - {{ evt.date }}</h3>
        <textarea
          v-model="syllabusUpdates[evt.id]"
          placeholder="Décrire le contenu du cours"
        ></textarea>
        <button @click="saveSyllabus(evt.id)">Enregistrer</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EnseignantSyllabusView',
    props: {
      calendarData: {
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
      myCourses() {
        // Filtrer les cours de l’enseignant actuel
        const currentTeacher = 'M. Dupont';
        return this.calendarData.filter(ev => ev.enseignant === currentTeacher);
      }
    },
    methods: {
      saveSyllabus(courseId) {
        const content = this.syllabusUpdates[courseId] || '';
        alert(`Syllabus sauvegardé pour le cours #${courseId} :\n${content}`);
        // Ici on pourrait émettre un événement ou appeler une API
      }
    }
  };
  </script>
  
  <style scoped>
  .syllabus-item {
    margin-bottom: 1rem;
  }
  .syllabus-item textarea {
    display: block;
    width: 100%;
    height: 80px;
    margin: 0.5rem 0;
  }
p,h1,h2,span ,li,ul{
    color: black;
}
</style>
  
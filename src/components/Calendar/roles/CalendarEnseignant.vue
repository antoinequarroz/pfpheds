<template>
    <div class="calendar-enseignant">
      <h2>Interface Enseignant</h2>
      <p>Ajouter ou modifier le syllabus pour ses cours assignés.</p>
  
      <div class="event-list">
        <div 
          v-for="event in myCourses" 
          :key="event.id"
          class="event-item"
        >
          <h3>{{ event.title }} ({{ event.date }})</h3>
          <p><strong>Description :</strong> {{ event.description }}</p>
          <p><strong>Semestre :</strong> {{ event.semestre }}</p>
  
          <label>Syllabus :</label>
          <textarea 
            v-model="syllabusUpdates[event.id]"
            placeholder="Décrire le contenu du cours"
          ></textarea>
  
          <button @click="saveSyllabus(event.id)">Enregistrer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalendarEnseignant',
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
        // Exemple : récupérer seulement les événements où 
        // l’enseignant correspond à "moi" (à adapter à l’utilisateur courant).
        const currentUser = 'M. Dupont';
        return this.calendarData.filter(ev => ev.enseignant === currentUser);
      }
    },
    methods: {
      saveSyllabus(eventId) {
        // Simule la sauvegarde du syllabus
        const newContent = this.syllabusUpdates[eventId] || '';
        alert(`Syllabus sauvegardé pour l’event #${eventId} :\n${newContent}`);
        // Dans un cas réel, on émet un event ou on appelle l’API, etc.
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-enseignant .event-list {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .event-item {
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 1rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  
  .event-item textarea {
    width: 100%;
    height: 100px;
    margin: 0.5rem 0;
  }
  p,h1,h2,span ,li,ul{
    color: black;
}
  </style>
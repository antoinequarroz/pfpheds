<template>
    <div class="calendar-rm">
      <h2>Interface Responsable de Module</h2>
      <p>Modification des cours, ajout/assignation d’enseignants, etc.</p>
  
      <div class="event-list">
        <div 
          v-for="event in calendarData" 
          :key="event.id"
          class="event-item"
        >
          <h3>{{ event.title }} ({{ event.date }})</h3>
          <p><strong>Description :</strong> {{ event.description }}</p>
          <p><strong>Enseignant :</strong> {{ event.enseignant }}</p>
  
          <label>Changer l’enseignant :</label>
          <input 
            v-model="updatedEnseignant"
            placeholder="Nom de l’enseignant"
          />
  
          <button @click="assignEnseignant(event)">Assigner</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalendarResponsableModule',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        updatedEnseignant: ''
      };
    },
    methods: {
      assignEnseignant(event) {
        if (this.updatedEnseignant.trim() === '') {
          alert('Veuillez saisir un nom d’enseignant.');
          return;
        }
        const updated = {
          ...event,
          enseignant: this.updatedEnseignant
        };
        this.$emit('update-calendar', updated);
        this.updatedEnseignant = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-rm .event-list {
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
  p,h1,h2,span ,li,ul{
    color: black;
}
  </style>
  
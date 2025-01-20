<template>
    <div class="calendar-etudiant">
      <h2>Interface Étudiant</h2>
      <p>Consulter le planning des cours, TP, examens.</p>
  
      <div class="event-list">
        <div 
          v-for="event in calendarData" 
          :key="event.id"
          class="event-item"
        >
          <h3>{{ event.title }} - {{ event.date }}</h3>
          <p><strong>Description :</strong> {{ event.description }}</p>
          <p><strong>Enseignant :</strong> {{ event.enseignant }}</p>
          <p><strong>Semestre :</strong> {{ event.semestre }} /
             <strong>Semaine :</strong> {{ event.semaine }} /
             <strong>Jour :</strong> {{ event.jour }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalendarEtudiant',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-etudiant .event-list {
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
  
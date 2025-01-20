<template>
    <div class="calendar-admin">
      <h2>Interface Secrétariat (admin)</h2>
      <p>Accès complet : création, modification, suppression d’événements.</p>
  
      <div class="event-list">
        <div 
          v-for="event in calendarData" 
          :key="event.id"
          class="event-item"
        >
          <h3>{{ event.title }} ({{ event.date }})</h3>
          <p><strong>Description : </strong>{{ event.description }}</p>
          <p><strong>Semestre :</strong> {{ event.semestre }}, 
             <strong>Semaine :</strong> {{ event.semaine }},
             <strong>Jour :</strong> {{ event.jour }}</p>
          <p><strong>Enseignant :</strong> {{ event.enseignant }}</p>
  
          <button @click="modifyEvent(event)">Modifier</button>
          <button @click="deleteEvent(event.id)">Supprimer</button>
        </div>
      </div>
  
      <button @click="createEvent">Créer un nouvel événement</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalendarAdmin',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      createEvent() {
        // Exemple de création : on envoie un événement fictif
        const newEvent = {
          id: Date.now(),
          date: '2025-02-01',
          title: 'Nouveau cours / événement',
          description: 'Description…',
          semestre: 'S2',
          semaine: 'Semaine 4',
          jour: 'Vendredi',
          enseignant: 'TBD'
        };
        this.$emit('update-calendar', newEvent);
      },
      modifyEvent(event) {
        // Exemple de modification : on ajoute un suffixe (vraiment basique).
        const updated = {
          ...event,
          title: event.title + ' (MAJ)'
        };
        this.$emit('update-calendar', updated);
      },
      deleteEvent(eventId) {
        // Dans un vrai scenario, on ferait un appel API, etc.
        // Ici on envoie un "dummy" pour signaler la suppression.
        const deletedEvent = { id: eventId, deleted: true };
        this.$emit('update-calendar', deletedEvent);
      }
    }
  };
  </script>
  
  <style scoped>
  p{color:black;}
  .calendar-admin .event-list {
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
  
  .event-item h3 {
    margin: 0;
  }
p,h1,h2,span ,li,ul{
    color: black;
}
</style>
  
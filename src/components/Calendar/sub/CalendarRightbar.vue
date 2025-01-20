<template>
    <div class="calendar-rightbar">
      <header>
        <h2>Outils &amp; Statistiques</h2>
      </header>
  
      <section class="stats-section">
        <h3>Statistiques</h3>
        <ul>
          <li>Total d’événements : {{ totalEvents }}</li>
        </ul>
      </section>
  
      <section class="actions-section">
        <h3>Actions rapides</h3>
        <button @click="importCalendar">Importer Planning</button>
        <button @click="exportCalendar">Exporter CSV</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalendarRightbar',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      totalEvents() {
        return this.calendarData.length;
      }
    },
    methods: {
      importCalendar() {
        alert('Import du planning (à implémenter)!');
      },
      exportCalendar() {
        alert('Export en CSV (à implémenter)!');
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-rightbar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .calendar-rightbar header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .stats-section h3,
  .actions-section h3 {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .stats-section ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  
  .stats-section li {
    margin-bottom: 0.25rem;
  }
  
  .actions-section button {
    background-color: #16a085;
    border: none;
    color: #ffffff;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .actions-section button:hover {
    background-color: #138f76;
  }
  p,h1,h2,span ,li,ul{
    color: black;
}
  </style>
  
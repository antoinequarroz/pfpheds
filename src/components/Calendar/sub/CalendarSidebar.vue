<template>
    <div class="calendar-sidebar">
      <header>
        <h2>Filtrer / Rôle</h2>
      </header>
  
      <section class="role-filters">
        <h3>Choix du rôle</h3>
        <ul>
          <li @click="changeRole('secretariat')">Secrétariat</li>
          <li @click="changeRole('responsableModule')">Responsable Module</li>
          <li @click="changeRole('enseignant')">Enseignant</li>
          <li @click="changeRole('etudiant')">Étudiant</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalendarSidebar',
    props: {
      currentRole: {
        type: String,
        default: 'etudiant'
      }
    },
    methods: {
      changeRole(role) {
        this.$emit('role-changed', role);
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .calendar-sidebar header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .role-filters h3 {
    color: #34495e;
    margin-bottom: 0.5rem;
  }
  
  .role-filters ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  
  .role-filters li {
    cursor: pointer;
    margin-bottom: 0.25rem;
    color: #2980b9;
  }
  
  .role-filters li:hover {
    text-decoration: underline;
  }
  p,h1,h2,span ,li,ul{
    color: black;
}
  </style>
  
<template>
    <div>
      <h2>Enseignant - Cours donnés</h2>
      <p>Liste des cours donnés par l’enseignant.</p>
  
      <ul>
        <li 
          v-for="evt in myCourses" 
          :key="evt.id"
        >
          {{ evt.title }} - {{ evt.date }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EnseignantCoursView',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      myCourses() {
        // Même logique : filtrer par l’enseignant courant
        const currentTeacher = 'M. Dupont';
        return this.calendarData.filter(ev => ev.enseignant === currentTeacher);
      }
    }
  };
  </script>
  <style>
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
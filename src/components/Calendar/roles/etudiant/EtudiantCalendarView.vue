<template>
    <div>
      <h2>Étudiant - Vue Calendrier</h2>
      <p>L’étudiant consulte le calendrier (sans modification).</p>
  
      <ul>
        <li v-for="evt in calendarData" :key="evt.id">
          {{ evt.title }} - {{ evt.date }} - {{ evt.enseignant }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EtudiantCalendarView',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>
  <style>
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>
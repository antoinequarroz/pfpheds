<template>
    <div>
      <h2>Étudiant - Vue Module</h2>
      <p>L’étudiant consulte la liste des modules/cours.</p>
  
      <ul>
        <li v-for="evt in calendarData" :key="evt.id">
          {{ evt.title }} - {{ evt.date }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EtudiantModuleView',
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
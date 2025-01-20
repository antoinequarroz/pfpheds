<template>
    <div>
      <h2>Responsable Module - Vue Calendrier</h2>
      <p>Consulter ou gérer le calendrier global, côté responsable de module.</p>
  
      <ul>
        <li v-for="evt in calendarData" :key="evt.id">
          {{ evt.title }} - {{ evt.date }} - {{ evt.enseignant }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ResponsableModuleCalendarView',
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